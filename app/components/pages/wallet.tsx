"use client";

import { useCallback, useEffect, useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

import { FooterNavbar } from "../footer/footer";

export const TonWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState(false);

  const handleToConnectWallet = useCallback((address: string) => {
    setWalletAddress(address);
    setIsLoading(false);
  }, []);

  const handleWalletDisconnect = useCallback(() => {
    setWalletAddress(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = () => {
      if (tonConnectUI.account?.address) {
        handleToConnectWallet(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnect();
      }
    };

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleToConnectWallet(wallet.account.address);
      } else {
        handleWalletDisconnect();
      }
    });

    checkWalletConnection();

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleToConnectWallet, handleWalletDisconnect]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    const temp_address = Address.parse(address).toString();
    return `${temp_address.slice(0, 4)}...${temp_address.slice(-4)}`;
  };

  if (isloading) {
    return (
      <main className="min-h-screen w-full flex flex-col justify-center items-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-between h-screen">
      <section className="w-full flex flex-col pt-64 items-center gap-6">
        <h3 className="text-white font-bold">TON CONNECT ADDRESS</h3>
        {walletAddress ? (
          <div className="flex flex-col gap-6">
            <p className="text-white">Connected: {formatAddress(walletAddress)}</p>

            <button
              className="py-2 px-4 footerbg rounded-xl text-white"
              onClick={handleWalletDisconnect}
            >
              Disconnect wallet
            </button>
          </div>
        ) : (
          <div>
            <button
              className="py-2 px-4 footerbg rounded-xl text-white"
              onClick={handleWalletAction}
            >
              Connect Ton Wallet
            </button>
          </div>
        )}
      </section>
      <FooterNavbar />
    </main>
  );
};
