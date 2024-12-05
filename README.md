# Rwa Async Swap

## Test
```shell
anvil --host 0.0.0.0
# Use one of the private keys in anvil
source .env
forge script script/V4Deployer.s.sol --rpc-url http://127.0.0.1:8545 --broadcast --private-key $TESTNET_PRIVATE_KEY
```
