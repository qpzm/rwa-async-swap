// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Currency} from "v4-core/types/Currency.sol";

interface IOracleSwap {
    error NotOwner();
    error TwoTokensAdded();
    error AddLiquidityThroughHook();
    error StalePrice();

    struct WithdrawalRequest {
        address receiver;
        uint256 amountSpecified;
    }

    struct HookData {
        address receiver;
    }

    struct CallbackData {
        uint256 amount;
        uint256 price; // decimals 8
        Currency currency0;
        Currency currency1;
        bool isZero;
        address sender;
    }
}
