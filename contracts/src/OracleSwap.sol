// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {IPriceOracle} from "./IPriceOracle.sol";
import {IOracleSwap} from "./IOracleSwap.sol";
import {BaseHook} from "v4-periphery/src/base/hooks/BaseHook.sol";
import {BeforeSwapDelta, toBeforeSwapDelta} from "v4-core/types/BeforeSwapDelta.sol";
import {CurrencySettler} from "@uniswap/v4-core/test/utils/CurrencySettler.sol";
import {Currency} from "v4-core/types/Currency.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";

contract OracleSwap is Ownable, BaseHook, IOracleSwap {
    using CurrencySettler for Currency;

    mapping(bool zeroForOne => mapping(uint256 taskId => WithdrawalRequest)) public swapQueue;
    uint256 public zeroForOneStartTaskId;
    uint256 public oneForZeroStartTaskId;
    uint256 public zeroForOneEndTaskId;
    uint256 public oneForZeroEndTaskId;
    IPriceOracle public priceOracle;
    string constant public tokenName = "KRBOND";

    constructor(address owner, IPoolManager poolManager, IPriceOracle _priceOracle) Ownable(owner) BaseHook(poolManager) {
        priceOracle = _priceOracle;
    }

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

    // Add a swap the given token pair
    function beforeSwap(
        address sender,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        bytes calldata hookData
    ) external override returns (bytes4, BeforeSwapDelta, uint24) {
        HookData memory hookData = abi.decode(hookData, (HookData));
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
        uint256 endTaskId = params.zeroForOne ? zeroForOneEndTaskId : oneForZeroEndTaskId;
        swapQueue[params.zeroForOne][endTaskId] = WithdrawalRequest({
            receiver: hookData.receiver,
            amountSpecified: amountInPositive
        });

        if (params.zeroForOne) {
            zeroForOneEndTaskId++;
        } else {
            oneForZeroEndTaskId++;
        }

        // return 0 delta
        return (this.beforeSwap.selector, beforeSwapDelta, 0);
    }

    // Disable adding liquidity through the PM
    // Later both enable sync and async swap
    function beforeAddLiquidity(
        address,
        PoolKey calldata,
        IPoolManager.ModifyLiquidityParams calldata,
        bytes calldata
    ) external pure override returns (bytes4) {
        revert AddLiquidityThroughHook();
    }

    // Custom add liquidity function called by owner
    function process(PoolKey calldata key, uint256 amount, bool isZero) external {
        IPriceOracle.TokenPrice memory price = priceOracle.tokenPrices(tokenName);

        require(block.timestamp < price.updatedAt + 1 hours, StalePrice());

        poolManager.unlock(
            abi.encode(
                CallbackData(
                    amount,
                    price.price,
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
                callbackData.amount,
                false // `burn` = `false` i.e. we're actually transferring tokens, not burning ERC-6909 Claim Tokens
            );
        }

        uint256 startTaskId;
        uint256 endTaskId;
        if (isZero) {
            startTaskId = oneForZeroStartTaskId;
            endTaskId   = oneForZeroEndTaskId;
        } else {
            startTaskId = zeroForOneStartTaskId;
            endTaskId   = zeroForOneEndTaskId;
        }

        // 3. Burn the input tokens from the PM
        for (uint256 i = startTaskId; i < endTaskId; i++) {
            // If isZero is true, oneForZero must be resolved
            WithdrawalRequest memory request = swapQueue[!isZero][i];
            uint256 amountUnspecified = _convertPrice(request.amountSpecified, callbackData.price, !isZero);
            if (isZero) {
                callbackData.currency0.take(
                    poolManager,
                    request.receiver,
                    amountUnspecified,
                    false
                );
            } else {
                callbackData.currency1.take(
                    poolManager,
                    request.receiver,
                    amountUnspecified,
                    false
                );
            }

            if (isZero) {
                oneForZeroStartTaskId++;
            } else {
                zeroForOneStartTaskId++;
            }
        }

        return "";
    }

    /// @param currencyZeroPrice currency0/currency1 price. price is 8 decimal
    function _convertPrice(uint256 inputAmount, uint256 currencyZeroPrice, bool zeroForOne) internal pure returns (uint256 outputAmount) {
        if (zeroForOne) {
            // token1Amount = tokenZeroAmount * currencyZeroPrice / 10 ** 8
            outputAmount = inputAmount * currencyZeroPrice / (10 ** 8);
        } else {
            // token0Amount = token1Amount * 10 ** 8 / currencyZeroPrice
            outputAmount = inputAmount * (10 ** 8) / currencyZeroPrice;
        }
    }
}
