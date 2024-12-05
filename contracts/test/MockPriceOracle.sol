// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
import {IPriceOracle} from "../src/IPriceOracle.sol";

contract MockPriceOracle is IPriceOracle {
    mapping(string => TokenPrice) internal _tokenPrices;

    function tokenPrices(string memory token) external override view returns (TokenPrice memory) {
        return _tokenPrices[token];
    }

    function updatePrice(string memory tokenName, uint256 price) external {
        _tokenPrices[tokenName] = TokenPrice(price, block.timestamp);
    }
}
