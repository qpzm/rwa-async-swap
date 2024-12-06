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
          11155420: "0x9E2E704683b87DbC4FCb29c2Dd4Ed7BF2D144888",
        },
        PoolManager: {
          31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          11155420: "0x27cFaf53A20e37e7D96502D13D3da484478882Fd",
        },
        PoolSwapTest: {
          31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          11155420: "0x405720F18DE27fcD94809e7C2C27A92340660081",
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
        11155420: "0x8eE6eFf2D8ED88Dc714547C54A55655a374a2e16",
      },
      name: "Token0",
    },
    {
      abi: erc20ABI,
      address: {
        31337: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        11155420: "0x8c8Ae4C21E244abD4968ce43699c43011014B370",
      },
      name: "Token1",
    },
  ],
});
