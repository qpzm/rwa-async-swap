import { useMemo } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import SwapUI from "~~/components/swap-ui/swapUI";

const SwapUIPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const isSwap = useMemo(() => query.page === "swap", [query.page]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  } else if (router.isReady && isSwap) {
    return <SwapUI />;
  }

  return <></>;
};

export default SwapUIPage;
