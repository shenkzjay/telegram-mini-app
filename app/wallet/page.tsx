"use client";

import { TonWallet } from "../components/pages/wallet";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="bg-[#1a1a1a]">
      <TonConnectUIProvider manifestUrl="https://gold-kind-clownfish-728.mypinata.cloud/ipfs/QmQXvZjvgZb99qEpP92AgAruWqXKTHRVg3k84BqczN95uj">
        <Suspense fallback="Loading..">
          <TonWallet />
        </Suspense>
      </TonConnectUIProvider>
    </div>
  );
}
