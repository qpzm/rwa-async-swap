import React, { useEffect, useState } from "react";
import { useChainId, useToken, usePublicClient } from "wagmi";
import {
  useOracleSwapZeroForOneStartTaskId,
  useOracleSwapZeroForOneEndTaskId,
  useOracleSwapProcess,
  oracleSwapABI,
} from "~~/generated/generated";
import { BLANK_TOKEN, ZERO_ADDR } from "~~/utils/constants";
import deployedContracts from "~~/generated/deployedContracts";
import { formatEther } from "viem";
import { TOKEN_ADDRESSES } from "~~/utils/config";

function QueueComponent() {
  const chainId = useChainId();
  const tokens = TOKEN_ADDRESSES.map(address => useToken({ address: address[chainId as keyof typeof address] })).map(
    (token, index) => ({
      ...(token.data ?? BLANK_TOKEN),
      index,
      name: index === 0 ? "USDT" : "T-Bill",
    }),
  );
  const [hookAddress, setHookAddress] = useState<`0x${string}`>(
    deployedContracts[chainId as keyof typeof deployedContracts][0]?.contracts.OracleSwap.address ?? ZERO_ADDR,
  );
  const zeroForOneStartTaskId = useOracleSwapZeroForOneStartTaskId({
    address: hookAddress,
  });
  const zeroForOneEndTaskId = useOracleSwapZeroForOneEndTaskId({
    address: hookAddress,
  });
  const processAction = useOracleSwapProcess({ address: hookAddress });
  const [queueItems, setQueueItems] = useState<{ key: bigint; receiver: string; amount: bigint }[]>([]);
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchQueueItems = async () => {
      if (zeroForOneStartTaskId.data !== undefined && zeroForOneEndTaskId.data !== undefined) {
        const items = [];
        for (let i = zeroForOneStartTaskId.data; i < zeroForOneEndTaskId.data; i++) {
          const result = await publicClient.readContract({
            address: hookAddress,
            abi: oracleSwapABI,
            functionName: "swapQueue",
            args: [true, BigInt(i)],
          });

          if (result) {
            items.push([i, result[0].toString(), BigInt(result[1])] as [bigint, string, bigint]);
          }
        }
        setQueueItems(items.map(([key, receiver, amount]) => ({ key, receiver, amount })));
      }
    };

    fetchQueueItems();
  }, [zeroForOneStartTaskId.data, zeroForOneEndTaskId.data, hookAddress, publicClient]);

  useEffect(() => {
    setHookAddress(
      deployedContracts[chainId as keyof typeof deployedContracts][0].contracts.OracleSwap.address ?? ZERO_ADDR,
    );
  }, [chainId]);

  return (
    <div className="card shadow-2xl p-6 bg-white rounded-xl border-2 border-pink-400 min-w-[40rem] max-w-2xl transition-shadow hover:shadow-none overflow-x-auto">
      <div className="space-y-6 w-full">
        <h1 className="text-xl font-bold mb-4">Queue Status</h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">index</th>
              <th className="px-4 py-2 text-left">receiver</th>
              <th className="px-4 py-2 text-left">amount</th>
            </tr>
          </thead>
          <tbody>
            {queueItems.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-sm">{i + 1}</td>
                <td className="px-4 py-2">{item.receiver}</td>
                <td className="px-4 py-2">{formatEther(item.amount)} USDT</td>
              </tr>
            ))}
          </tbody>
        </table>
        {queueItems.length === 0 && <p className="text-center text-gray-500">Queue is empty</p>}

        {queueItems.length > 0 && (
          <div className="flex justify-center">
            <button
              className="btn btn-primary w-full hover:bg-indigo-600 hover:shadow-lg active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all mt-4"
              onClick={() =>
                processAction.writeAsync({
                  args: [
                    {
                      currency0: tokens[0].address,
                      currency1: tokens[1].address,
                      fee: 3000,
                      tickSpacing: 120,
                      hooks: hookAddress,
                    },
                    queueItems.reduce((acc, item) => acc + item.amount, 0n),
                    true,
                  ],
                })
              }
            >
              Execute
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueueComponent;
