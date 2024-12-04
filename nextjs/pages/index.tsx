import { Snippet } from "@nextui-org/react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { title } from "~~/components/primitives";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-2xl text-center justify-center">
              <h1
                className={title({
                  size: "lg",
                })}
              >
                RWA Async Swap
              </h1>
            </div>

            <div className="mt-16 mx-10 px-10">
              {/* Step 1 */}
              <motion.div
                className="mx-10"
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ delay: 0.2 }}
              >
                <div className=" w-full gap-4">
                  <Snippet
                    symbol=""
                    hideCopyButton
                    variant="bordered"
                    className="mb-4 break-all  whitespace-pre flex-wrap whitespace-normal whitespace-break-spaces"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span>We are interested in onboarding real-world assets on chain.</span>
                    <span>The main challenge in trading RWAs is the onboarding and offboarding of the assets.</span>
                    <span>
                      We are building Uniswap into the premier gateway that connects various real-world assets from Web2
                      to Web3.
                    </span>
                  </Snippet>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
