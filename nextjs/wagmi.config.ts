import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";

export default defineConfig({
  out: "generated/generated.ts",
  plugins: [
    foundry({
      forge: {
        build: false, // disable build because we are using a custom solc
      },
      project: "..", // path to the project root (directory holding foundry.toml)
      deployments: {
        // --------------------------------------------------
        // 👉 Update the address with your deployed hook 👈
        // --------------------------------------------------
        // Do not change
        // --------------------------------------------------
        OracleSwap: {
          31337: "0x22a8e2faa3ce538630b8867c587a044a9a8cc888",
        },
        PoolManager: {
          31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        },
        PoolSwapTest: {
          31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        },
      },
    }),
    react(),
  ],
  contracts: [
    // --------------------------------------------------
    // (Optional): Update to use your own deployed tokens
    // --------------------------------------------------
    {
      abi: erc20ABI,
      address: {
        31337: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      },
      name: "Token0",
    },
    {
      abi: erc20ABI,
      address: {
        31337: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
      },
      name: "Token1",
    },
  ],
});
