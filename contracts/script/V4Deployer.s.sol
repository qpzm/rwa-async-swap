// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {PoolManager} from "v4-core/PoolManager.sol";
import {PoolSwapTest} from "v4-core/test/PoolSwapTest.sol";
import {PoolModifyLiquidityTest} from "v4-core/test/PoolModifyLiquidityTest.sol";
import {PoolDonateTest} from "v4-core/test/PoolDonateTest.sol";
import {PoolTakeTest} from "v4-core/test/PoolTakeTest.sol";
import {PoolClaimsTest} from "v4-core/test/PoolClaimsTest.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {Currency} from "v4-core/types/Currency.sol";
import {MockERC20} from "solmate/src/test/utils/mocks/MockERC20.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";

import {HookMiner} from "./HookMiner.sol";
import {OracleSwap} from "src/OracleSwap.sol";
import {IPriceOracle} from "src/IPriceOracle.sol";
import "forge-std/console.sol";

contract V4Deployer is Script {
    /// @dev Included to enable compilation of the script without a $MNEMONIC environment variable.
    // string internal constant TEST_MNEMONIC = "test test test test test test test test test test test junk";
    uint256 internal PRIVATE_KEY;
    string internal networkName;

    bytes constant ZERO_BYTES = new bytes(0);
    uint160 public constant SQRT_PRICE_1_1 = 79228162514264337593543950336;
    address public constant CREATE2_DEPLOYER = 0x4e59b44847b379578588920cA78FbF26c0B4956C;

    /// @dev The address of the transaction broadcaster.
    address internal broadcaster;

    /// @dev Used to derive the broadcaster's address if $ETH_FROM is not defined.
    string internal mnemonic;

    Currency token0;
    Currency token1;

    PoolKey key;

    constructor() {
        PRIVATE_KEY = vm.envOr("TESTNET_PRIVATE_KEY", uint256(1));
        broadcaster = vm.rememberKey(PRIVATE_KEY);
        console.log("Broadcaster: ", broadcaster);
    }

    function swap() public {
        vm.startBroadcast();
        PoolSwapTest swapRouter = PoolSwapTest(address(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512));
        key = PoolKey({
            currency0: Currency.wrap(0x0165878A594ca255338adfa4d48449f69242Eb8F),
            currency1: Currency.wrap(0xa513E6E4b8f2a923D98304ec87F64353C4D5C853),
            fee: 3000,
            tickSpacing: 120,
            hooks: IHooks(0x22a8E2fAA3ce538630B8867c587a044a9A8cC888)
        });

        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: true,
            amountSpecified: 10000000000000000000, // 10 tokens
            sqrtPriceLimitX96: 4295128740
        });

        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        bytes memory hookData = abi.encode(address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266));

        swapRouter.swap(key, params, settings, hookData);
        vm.stopBroadcast();
    }

    // ref: https://docs.uniswap.org/contracts/v4/deployments
    function run_op_sepolia() public {
        vm.startBroadcast();
        /*
        PoolManager manager = PoolManager(address(0xE5dF461803a59292c6c03978c17857479c40bc46));
        IPriceOracle priceOracle = IPriceOracle(address(0xbDAB27D1903da4e18B0D1BE873E18924514E52eC));
        PoolSwapTest poolSwapRouter = PoolSwapTest(address(0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16));
        PoolModifyLiquidityTest poolModifyLiquidityRouter = PoolModifyLiquidityTest(address(0xd962b16F4ec712D705106674E944B04614F077be));
        */
        uint256 controllerGasLimit = 0;
        // TODO: get from deployments
        IPriceOracle priceOracle = IPriceOracle(address(0xbDAB27D1903da4e18B0D1BE873E18924514E52eC));
        PoolManager manager = new PoolManager(controllerGasLimit);
        // optimism sepolia
        // PoolManager manager = PoolManager(address(0xE5dF461803a59292c6c03978c17857479c40bc46));
        console.log("Deployed PoolManager at", address(manager));
        PoolSwapTest swapRouter = new PoolSwapTest(manager);
        console.log("Deployed PoolSwapTest at", address(swapRouter));
        PoolModifyLiquidityTest modifyLiquidityRouter = new PoolModifyLiquidityTest(
            manager
        );
        console.log(
            "Deployed PoolModifyLiquidityTest at",
            address(modifyLiquidityRouter)
        );

        PoolDonateTest donateRouter = new PoolDonateTest(manager);
        console.log("Deployed PoolDonateTest at", address(donateRouter));
        PoolTakeTest takeRouter = new PoolTakeTest(manager);
        console.log("Deployed PoolTakeTest at", address(takeRouter));
        PoolClaimsTest claimsRouter = new PoolClaimsTest(manager);
        console.log("Deployed PoolClaimsTest at", address(claimsRouter));

        MockERC20 tokenA = new MockERC20("Token0", "TK0", 18);
        MockERC20 tokenB = new MockERC20("Token1", "TK1", 18);
        console.log("Deployed MockERC20 tokenA at", address(tokenA));
        console.log("Deployed MockERC20 tokenB at", address(tokenB));

        if (address(tokenA) > address(tokenB)) {
            (token0, token1) = (
                Currency.wrap(address(tokenB)),
                Currency.wrap(address(tokenA))
            );
        } else {
            (token0, token1) = (
                Currency.wrap(address(tokenA)),
                Currency.wrap(address(tokenB))
            );
        }

        /*
        tokenA.approve(address(modifyLiquidityRouter), type(uint256).max);
        tokenB.approve(address(modifyLiquidityRouter), type(uint256).max);
        tokenA.approve(address(swapRouter), type(uint256).max);
        tokenB.approve(address(swapRouter), type(uint256).max);
        */
        console.log("msg.sender: %s", msg.sender);
        tokenA.mint(msg.sender, 100 * 10 ** 18);
        tokenB.mint(msg.sender, 100 * 10 ** 18);

        // Anything else you need to do like minting mock ERC20s or initializing a pool
        // you need to do directly here as well without using Deployers
        vm.stopBroadcast();

        uint160 flags = uint160(
            Hooks.BEFORE_ADD_LIQUIDITY_FLAG |
            Hooks.BEFORE_SWAP_FLAG |
            Hooks.BEFORE_SWAP_RETURNS_DELTA_FLAG
        );

        (address hookAddress, bytes32 salt) = HookMiner.find(
            CREATE2_DEPLOYER,
            flags,
            type(OracleSwap).creationCode,
            abi.encode(broadcaster, manager, priceOracle)
        );

        vm.startBroadcast();

        console.log("Deploy OracleSwap");
        OracleSwap oracleSwap = new OracleSwap{salt: salt}(broadcaster, manager, priceOracle);
        console.log("Deployed OracleSwap at", address(oracleSwap));
        require(address(oracleSwap) == hookAddress, "hook address mismatch");

        key = PoolKey({
            currency0: token0,
            currency1: token1,
            fee: 3000,
            tickSpacing: 120,
            hooks: IHooks(address(hookAddress))
        });

        manager.initialize(key, SQRT_PRICE_1_1, ZERO_BYTES);
        vm.stopBroadcast();
        console.log("Done!");
    }

    function run() public {
        vm.startBroadcast();

        uint256 controllerGasLimit = 0;
        // TODO: get from deployments
        IPriceOracle priceOracle = IPriceOracle(address(0x0));
        PoolManager manager = new PoolManager(controllerGasLimit);
        // optimism sepolia
        // PoolManager manager = PoolManager(address(0xE5dF461803a59292c6c03978c17857479c40bc46));
        console.log("Deployed PoolManager at", address(manager));
        PoolSwapTest swapRouter = new PoolSwapTest(manager);
        console.log("Deployed PoolSwapTest at", address(swapRouter));
        PoolModifyLiquidityTest modifyLiquidityRouter = new PoolModifyLiquidityTest(
            manager
        );
        console.log(
            "Deployed PoolModifyLiquidityTest at",
            address(modifyLiquidityRouter)
        );
        PoolDonateTest donateRouter = new PoolDonateTest(manager);
        console.log("Deployed PoolDonateTest at", address(donateRouter));
        PoolTakeTest takeRouter = new PoolTakeTest(manager);
        console.log("Deployed PoolTakeTest at", address(takeRouter));
        PoolClaimsTest claimsRouter = new PoolClaimsTest(manager);
        console.log("Deployed PoolClaimsTest at", address(claimsRouter));

        MockERC20 tokenA = new MockERC20("Token0", "TK0", 18);
        MockERC20 tokenB = new MockERC20("Token1", "TK1", 18);
        console.log("Deployed MockERC20 tokenA at", address(tokenA));
        console.log("Deployed MockERC20 tokenB at", address(tokenB));

        if (address(tokenA) > address(tokenB)) {
            (token0, token1) = (
                Currency.wrap(address(tokenB)),
                Currency.wrap(address(tokenA))
            );
        } else {
            (token0, token1) = (
                Currency.wrap(address(tokenA)),
                Currency.wrap(address(tokenB))
            );
        }

        /*
        tokenA.approve(address(modifyLiquidityRouter), type(uint256).max);
        tokenB.approve(address(modifyLiquidityRouter), type(uint256).max);
        tokenA.approve(address(swapRouter), type(uint256).max);
        tokenB.approve(address(swapRouter), type(uint256).max);
        */
        console.log("msg.sender: %s", msg.sender);
        tokenA.mint(msg.sender, 100 * 10 ** 18);
        tokenB.mint(msg.sender, 100 * 10 ** 18);

        // Anything else you need to do like minting mock ERC20s or initializing a pool
        // you need to do directly here as well without using Deployers
        vm.stopBroadcast();

        uint160 flags = uint160(
            Hooks.BEFORE_ADD_LIQUIDITY_FLAG |
            Hooks.BEFORE_SWAP_FLAG |
            Hooks.BEFORE_SWAP_RETURNS_DELTA_FLAG
        );

        (address hookAddress, bytes32 salt) = HookMiner.find(
            CREATE2_DEPLOYER,
            flags,
            type(OracleSwap).creationCode,
            abi.encode(broadcaster, manager, priceOracle)
        );

        vm.startBroadcast();

        console.log("Deploy OracleSwap");
        OracleSwap oracleSwap = new OracleSwap{salt: salt}(broadcaster, manager, priceOracle);
        console.log("Deployed OracleSwap at", address(oracleSwap));
        require(address(oracleSwap) == hookAddress, "hook address mismatch");

        key = PoolKey({
            currency0: token0,
            currency1: token1,
            fee: 3000,
            tickSpacing: 120,
            hooks: IHooks(address(hookAddress))
        });

        manager.initialize(key, SQRT_PRICE_1_1, ZERO_BYTES);
        vm.stopBroadcast();
        console.log("Done!");
    }
}
