// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import {IHooks} from "v4-core/interfaces/IHooks.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {TickMath} from "v4-core/libraries/TickMath.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {CurrencyLibrary, Currency} from "v4-core/types/Currency.sol";
import {PoolId, PoolIdLibrary} from "v4-core/types/PoolId.sol";
import {PoolSwapTest} from "v4-core/test/PoolSwapTest.sol";
import {Deployers} from "@uniswap/v4-core/test/utils/Deployers.sol";
import {OracleSwap} from "../src/OracleSwap.sol";
import {IERC20Minimal} from "v4-core/interfaces/external/IERC20Minimal.sol";

contract OracleSwapTest is Test, Deployers {
    using PoolIdLibrary for PoolId;
    using CurrencyLibrary for Currency;

    OracleSwap public hook;
    address public owner;

    function setUp() public {
        owner = address(this);
        deployFreshManagerAndRouters();
        (currency0, currency1) = deployMintAndApprove2Currencies();
        address hookAddress = address(
            uint160(
                Hooks.BEFORE_ADD_LIQUIDITY_FLAG |
                Hooks.BEFORE_SWAP_FLAG |
                Hooks.BEFORE_SWAP_RETURNS_DELTA_FLAG
            )
        );
        deployCodeTo("OracleSwap.sol", abi.encode(owner, manager), hookAddress);
        hook = OracleSwap(hookAddress);

        (key, ) = initPool(
            currency0,
            currency1,
            hook,
            3000,
            SQRT_PRICE_1_1,
            ZERO_BYTES
        );


        vm.label(owner, "owner");
        vm.label(address(hook), "hook");
        vm.label(Currency.unwrap(currency0), "token0");
        vm.label(Currency.unwrap(currency1), "token1");
    }

    // FIXME:
    function test_claimTokenBalances() public view {
        uint token0ClaimID = CurrencyLibrary.toId(currency0);
        uint token1ClaimID = CurrencyLibrary.toId(currency1);

        uint token0ClaimsBalance = manager.balanceOf(address(hook), token0ClaimID);
        uint token1ClaimsBalance = manager.balanceOf(address(hook), token1ClaimID);

        assertEq(token0ClaimsBalance, 1000 ether);
        assertEq(token1ClaimsBalance, 1000 ether);
    }

    function test_cannotModifyLiquidity() public {
        vm.expectRevert();
        modifyLiquidityRouter.modifyLiquidity(
            key,
            IPoolManager.ModifyLiquidityParams({
                tickLower: -60,
                tickUpper: 60,
                liquidityDelta: 1e18,
                salt: bytes32(0)
            }),
            ZERO_BYTES
        );
    }

    function test_RevertWhen_swap_exactOutput_zeroForOne() public {
        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });
        vm.expectRevert();
        swapRouter.swap(
            key,
            IPoolManager.SwapParams({
                zeroForOne: true,
                amountSpecified: 100e18,
                sqrtPriceLimitX96: TickMath.MIN_SQRT_PRICE + 1
            }),
            settings,
            ZERO_BYTES
        );
    }

    function test_RevertWhen_swap_exactOut_oneForZero() public {
        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });
        vm.expectRevert();
        swapRouter.swap(
            key,
            IPoolManager.SwapParams({
                zeroForOne: false,
                amountSpecified: 100e18,
                sqrtPriceLimitX96: TickMath.MIN_SQRT_PRICE + 1
            }),
            settings,
            ZERO_BYTES
        );
    }

    // queue a zero for one swap
    function test_swap_exactInput_zeroForOne_queue_one_task() public {
        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        uint balanceOfTokenABefore = key.currency0.balanceOfSelf();
        uint balanceOfTokenBBefore = key.currency1.balanceOfSelf();
        swapRouter.swap(
            key,
            IPoolManager.SwapParams({
                zeroForOne: true,
                amountSpecified: -100e18, // exact input
                sqrtPriceLimitX96: TickMath.MIN_SQRT_PRICE + 1 // does not matter
            }),
            settings,
            ZERO_BYTES
        );

        assertEq(hook.zeroForOneStartTaskId(), 0);
        assertEq(hook.zeroForOneEndTaskId(), 1);

        uint balanceOfTokenAAfter = key.currency0.balanceOfSelf();
        uint balanceOfTokenBAfter = key.currency1.balanceOfSelf();
        assertEq(balanceOfTokenABefore - balanceOfTokenAAfter, 100e18, "Wrong tokenA balance");
        assertEq(balanceOfTokenBAfter, balanceOfTokenBBefore, "Different tokenB balance");
    }

    function test_swap_exactInput_oneForZero_queue_one_task() public {
        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        uint balanceOfTokenABefore = key.currency0.balanceOfSelf();
        uint balanceOfTokenBBefore = key.currency1.balanceOfSelf();
        swapRouter.swap(
            key,
            IPoolManager.SwapParams({
                zeroForOne: false,
                amountSpecified: -100e18, // exact input
                sqrtPriceLimitX96: TickMath.MIN_SQRT_PRICE + 1 // does not matter
            }),
            settings,
            ZERO_BYTES
        );

        assertEq(hook.oneForZeroStartTaskId(), 0);
        assertEq(hook.oneForZeroEndTaskId(), 1);

        uint balanceOfTokenAAfter = key.currency0.balanceOfSelf();
        uint balanceOfTokenBAfter = key.currency1.balanceOfSelf();
        assertEq(balanceOfTokenAAfter, balanceOfTokenABefore, "Different tokenA balance");
        assertEq(balanceOfTokenBBefore - balanceOfTokenBAfter, 100e18, "Wrong tokenB balance");
    }

    // FIXME: CurrencyNotSettled
    function test_addLiquidity_token0_process_all_tasks() public {
        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        // 1. queue one zeroForOne swap
        swapRouter.swap(
            key,
            IPoolManager.SwapParams({
                zeroForOne: true,
                amountSpecified: -1000e18, // exact input
                sqrtPriceLimitX96: TickMath.MIN_SQRT_PRICE + 1 // does not matter
            }),
            settings,
            ZERO_BYTES
        );

        uint256 price = 1e8;
        uint256 amount = 1000e18;
        IERC20Minimal(Currency.unwrap(key.currency0)).approve(
            address(hook),
            1000 ether
        );
        IERC20Minimal(Currency.unwrap(key.currency1)).approve(
            address(hook),
            1000 ether
        );

        // currency0.transfer(owner, amount);
        // currency1.transfer(address(this), amount);


        // add currency1 to resolve zeroForOne swaps
        hook.addLiquidity({
            key: key,
            amount: amount,
            price: price,
            isZero: false
        });

        // check users get claim
    }

    function test_addLiquidity_token1_process_all_tasks() public {
        // TODO:
    }

    /*
    function test_swap_exactInput_zeroForOne() public {
        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        uint balanceOfTokenABefore = key.currency0.balanceOfSelf();
        uint balanceOfTokenBBefore = key.currency1.balanceOfSelf();
        swapRouter.swap(
            key,
            IPoolManager.SwapParams({
                zeroForOne: true,
                amountSpecified: -100e18, // exact input
                sqrtPriceLimitX96: TickMath.MIN_SQRT_PRICE + 1
            }),
            settings,
            ZERO_BYTES
        );

        uint balanceOfTokenAAfter = key.currency0.balanceOfSelf();
        uint balanceOfTokenBAfter = key.currency1.balanceOfSelf();

        assertEq(balanceOfTokenBAfter - balanceOfTokenBBefore, 100e18);
        assertEq(balanceOfTokenABefore - balanceOfTokenAAfter, 100e18);
    }

    function test_swap_exactOutput_zeroForOne() public {
        PoolSwapTest.TestSettings memory settings = PoolSwapTest.TestSettings({
            takeClaims: false,
            settleUsingBurn: false
        });

        uint balanceOfTokenABefore = key.currency0.balanceOfSelf();
        uint balanceOfTokenBBefore = key.currency1.balanceOfSelf();
        swapRouter.swap(
            key,
            IPoolManager.SwapParams({
                zeroForOne: true,
                amountSpecified: 100e18, // exact output
                sqrtPriceLimitX96: TickMath.MIN_SQRT_PRICE + 1
            }),
            settings,
            ZERO_BYTES
        );

        uint balanceOfTokenAAfter = key.currency0.balanceOfSelf();
        uint balanceOfTokenBAfter = key.currency1.balanceOfSelf();

        assertEq(balanceOfTokenBAfter - balanceOfTokenBBefore, 100e18);
        assertEq(balanceOfTokenABefore - balanceOfTokenAAfter, 100e18);
    }
    */
}
