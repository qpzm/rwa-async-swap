// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {Currency} from "v4-core/types/Currency.sol";
import {CurrencySettler} from "@uniswap/v4-core/test/utils/CurrencySettler.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {BeforeSwapDelta, toBeforeSwapDelta} from "v4-core/types/BeforeSwapDelta.sol";
import {BaseHook} from "v4-periphery/src/base/hooks/BaseHook.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {console} from "forge-std/console.sol";

contract OracleSwap is Ownable, BaseHook {
    using CurrencySettler for Currency;

    error NotOwner();
    error TwoTokensAdded();

    mapping(bool zeroForOne => mapping(uint256 taskId => uint256 amountSpecified)) public swapQueue;
    uint256 public zeroForOneStartTaskId;
    uint256 public oneForZeroStartTaskId;
    uint256 public zeroForOneEndTaskId;
    uint256 public oneForZeroEndTaskId;

    error AddLiquidityThroughHook();

    struct CallbackData {
        uint256 amount;
        uint256 price; // decimals 8
        Currency currency0;
        Currency currency1;
        bool isZero;
        address sender;
    }

    constructor(address owner, IPoolManager poolManager) Ownable(owner) BaseHook(poolManager) {}

    function getHookPermissions()
        public
        pure
        override
        returns (Hooks.Permissions memory)
    {
        return
            Hooks.Permissions({
                beforeInitialize: false,
                afterInitialize: false,
                beforeAddLiquidity: true, // Don't allow adding liquidity normally
                afterAddLiquidity: false,
                beforeRemoveLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: true, // Override how swaps are done
                afterSwap: false,
                beforeDonate: false,
                afterDonate: false,
                beforeSwapReturnDelta: true, // Allow beforeSwap to return a custom delta
                afterSwapReturnDelta: false,
                afterAddLiquidityReturnDelta: false,
                afterRemoveLiquidityReturnDelta: false
            });
    }

    // Disable adding liquidity through the PM
    function beforeAddLiquidity(
        address,
        PoolKey calldata,
        IPoolManager.ModifyLiquidityParams calldata,
        bytes calldata
    ) external pure override returns (bytes4) {
        revert AddLiquidityThroughHook();
    }

    // Custom add liquidity function called by owner
    function addLiquidity(PoolKey calldata key, uint256 amount, uint256 price, bool isZero) external {
        poolManager.unlock(
            abi.encode(
                CallbackData(
                    amount,
                    price,
                    key.currency0,
                    key.currency1,
                    isZero,
                    msg.sender
                )
            )
        );
    }

    // If USDC is added to the pool, process the BOND->USDC swap queue
        // 1. settle given USDC to PM
        // 2. take BOND and burn
        // startTaskId = EndTaskId
        // TODO: check the task id until the amount can match
    // If BOND is added to the pool, process the USDC->BOND swap queue
    function _unlockCallback(
        bytes calldata data
    ) internal override returns (bytes memory) {
        CallbackData memory callbackData = abi.decode(data, (CallbackData));
        bool isZero = callbackData.isZero;

        require(callbackData.sender == owner(), OwnableUnauthorizedAccount(callbackData.sender));

        // 1. revert if two tokens are added
        // if (!callbackData.currency0.isZero() && !callbackData.currency1.isZero()) revert TwoTokensAdded();

        // 2. settle the given token to the PM
        console.log("settle start");
        if (isZero) {
            callbackData.currency0.settle(
                poolManager,
                callbackData.sender,
                callbackData.amount,
                false // `burn` = `false` i.e. we're actually transferring tokens, not burning ERC-6909 Claim Tokens
            );
        } else {
            callbackData.currency1.settle(
                poolManager,
                callbackData.sender,
                // FIXME: test
                // callbackData.amount,
                callbackData.amount,
                false // `burn` = `false` i.e. we're actually transferring tokens, not burning ERC-6909 Claim Tokens
            );
        }
        console.log("settle done");

        uint256 startTaskId;
        // addLiquidity currency0 resolves oneForZero swap tasks
        if (isZero) {
            startTaskId = oneForZeroStartTaskId;
        } else {
            startTaskId = zeroForOneStartTaskId;
        }

        // 3. Burn the input tokens from the PM
        for (uint256 i = startTaskId; i < zeroForOneEndTaskId; i++) {
            console.log("i", i);
            // If isZero is true, oneForZero must be resolved
            uint256 amountSpecified = swapQueue[!isZero][i];
            uint256 amountUnspecified = amountSpecified * callbackData.price / 10 ** 8;
            console.log("amountSpecified: %s", amountSpecified);
            console.log("amountUnSpecified: %s", amountUnspecified);
            if (isZero) {
                callbackData.currency0.take(
                    poolManager,
                    address(this),
                    amountUnspecified,
                    true
                );
            } else {
                callbackData.currency1.take(
                    poolManager,
                    // FIXME: save task.recipient
                    address(this),
                    amountUnspecified,
                    true
                );
            }
        }

        return "";
    }

    // Add a swap the given token pair
    function beforeSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        bytes calldata
    ) external override returns (bytes4, BeforeSwapDelta, uint24) {
        require(params.amountSpecified < 0, "must be exact input");

        uint256 amountInPositive = uint256(-params.amountSpecified);

        // async swap
        // the initial price is 1 to 1
        BeforeSwapDelta beforeSwapDelta = toBeforeSwapDelta(
            int128(-params.amountSpecified), 0
        );

        if (params.zeroForOne) {
            key.currency0.take(
                poolManager,
                address(this),
                amountInPositive,
                true // claims
            );
        } else {
            key.currency1.take(
                poolManager,
                address(this),
                amountInPositive,
                true // claims
            );
        }

        // Add to the swap queue
        swapQueue[params.zeroForOne][zeroForOneEndTaskId] = amountInPositive;
        if (params.zeroForOne) {
            zeroForOneEndTaskId++;
        } else {
            oneForZeroEndTaskId++;
        }
        console.log("---beforeSwap end---");

        // return 0 delta
        return (this.beforeSwap.selector, beforeSwapDelta, 0);
    }
}
