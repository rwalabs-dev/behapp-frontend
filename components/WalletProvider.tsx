"use client";

import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "@/config/wallet";

export function WalletProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
