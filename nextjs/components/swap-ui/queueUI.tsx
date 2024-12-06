import QueueComponent from "./queueComponent";
import { MetaHeader } from "~~/components/MetaHeader";

const SwapUI = () => {
  return (
    <>
      <MetaHeader title="Swap UI | Uniswap Project" description="Swap and manage your tokens seamlessly." />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <QueueComponent />
      </div>
    </>
  );
};

export default SwapUI;
