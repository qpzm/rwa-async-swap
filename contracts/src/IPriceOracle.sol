// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface IPriceOracle {
    struct TokenPrice {
        uint256 price;
        uint256 updatedAt;
    }

    function tokenPrices(string memory token) external view returns (TokenPrice memory);
}
