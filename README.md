# RwAsync Swap

## Description
We aspire to develop a user-friendly gateway connecting various real world assets from web2 to web3. User swap requests are queued until an admin executes real-world transactions. An admin processes the queued swaps at oracle prices later.

## Links

- [Demo](https://www.loom.com/share/a5044867bfde436e93f546e01f2c02f8?sid=5cec31ab-a7c1-485d-ae28-62476ec4a053)

- [Deck](https://docs.google.com/presentation/d/1E0EWBU3MpRwR8F4PZRyKmt0iyALCcPgp0nAPknPVZmA/edit?usp=sharing)

## Contract addresses

| Contract | Address |
|----------|---------|
| PoolManager | [0x27cFaf53A20e37e7D96502D13D3da484478882Fd](https://sepolia-optimism.etherscan.io/address/0x27cFaf53A20e37e7D96502D13D3da484478882Fd) |
| PoolSwapTest | [0x405720F18DE27fcD94809e7C2C27A92340660081](https://sepolia-optimism.etherscan.io/address/0x405720F18DE27fcD94809e7C2C27A92340660081) |
| PoolModifyLiquidityTest | [0xd8f0fb5C53f24eC1Ed368e362d7d8CE0aC34b8d2](https://sepolia-optimism.etherscan.io/address/0xd8f0fb5C53f24eC1Ed368e362d7d8CE0aC34b8d2) |
| MockERC20 tokenA | [0x8eE6eFf2D8ED88Dc714547C54A55655a374a2e16](https://sepolia-optimism.etherscan.io/address/0x8eE6eFf2D8ED88Dc714547C54A55655a374a2e16) |
| MockERC20 tokenB | [0x8c8Ae4C21E244abD4968ce43699c43011014B370](https://sepolia-optimism.etherscan.io/address/0x8c8Ae4C21E244abD4968ce43699c43011014B370) |
| deployer | [0x189027e3C77b3a92fd01bF7CC4E6a86E77F5034E](https://sepolia-optimism.etherscan.io/address/0x189027e3C77b3a92fd01bF7CC4E6a86E77F5034E) |
| OracleSwap | [0x9E2E704683b87DbC4FCb29c2Dd4Ed7BF2D144888](https://sepolia-optimism.etherscan.io/address/0x9E2E704683b87DbC4FCb29c2Dd4Ed7BF2D144888) |
| PoolDonateTest | [0xd8A5f1EF6C08e1c4234EBC57cAeE890120032912](https://sepolia-optimism.etherscan.io/address/0xd8A5f1EF6C08e1c4234EBC57cAeE890120032912) |
| PoolTakeTest | [0xB678DF2Db16A0f5DAf78b01E9240c56414B645a7](https://sepolia-optimism.etherscan.io/address/0xB678DF2Db16A0f5DAf78b01E9240c56414B645a7) |
| PoolClaimsTest | [0xd8c28Befa2A63ADB55B2BCc25d4C64e93b9Daf24](https://sepolia-optimism.etherscan.io/address/0xd8c28Befa2A63ADB55B2BCc25d4C64e93b9Daf24) |

## Test
### Local
```sh
cd contracts
forge test
```

### Demo
```shell
anvil --host 0.0.0.0
# Use one of the private keys in anvil
source .env
forge script script/V4Deployer.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --private-key $TESTNET_PRIVATE_KEY
```

## Collaborators
- [qpzm](https://github.com/qpzm)
- [donguks](https://github.com/donguks)
