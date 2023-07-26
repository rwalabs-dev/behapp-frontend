import "./globals.css";

import Image from "next/image";
import localFont from "next/font/local";
import { Toaster } from "@/components/Toaster";
import { BuyButton } from "@/components/BuyButton";
import { ConnectButton } from "@/components/ConnectButton";
import { WalletProvider } from "@/components/WalletProvider";

const font = localFont({
    src: [
        {
            path: "./MuseoSansRounded-300.woff2",
            weight: "300",
        },
        {
            path: "./MuseoSansRounded-700.woff2",
            weight: "700",
        },
    ]
});

export const metadata = {
    title: 'Block estate staking app test',
    description: 'Block estate staking app test',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={font.className}>
                <WalletProvider>
                    <Toaster />
                    <div className="container mx-auto mt-4 mb-96">
                        <main className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4 mx-auto w-96 lg:flex-row lg:w-[50rem] lg:items-center">
                                <div className="relative h-16 lg:w-48">
                                    <Image src="/logo.svg" alt="Blockestate staking app" fill />
                                </div>
                                <div className="w-full lg:order-first">
                                    <BuyButton />
                                </div>
                                <div className="w-full lg:order-last">
                                    <ConnectButton />
                                </div>
                            </div>
                            {children}
                        </main>
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
