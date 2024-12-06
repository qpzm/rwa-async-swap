import { poolManagerABI, poolModifyLiquidityTestABI, poolSwapTestABI, oracleSwapABI } from "./generated";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

export const deployedContracts: GenericContractsDeclaration = {
  31337: [
    {
      name: "Anvil",
      chainId: "31337",
      contracts: {
        PoolManager: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: poolManagerABI,
        },
        OracleSwap: {
          address: "0x22a8e2faa3ce538630b8867c587a044a9a8cc888",
          abi: oracleSwapABI,
        },
        PoolSwapTest: {
          address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
          abi: poolSwapTestABI,
        },
      },
    },
  ],
};

export default deployedContracts;
