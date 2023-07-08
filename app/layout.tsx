import "./globals.css";

import { Inter } from 'next/font/google';
import { BuyButton } from "@/components/BuyButton";
import { WalletProvider } from "@/components/WalletProvider";
import { WalletConnectButton } from "@/components/WalletConnectButton";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Block estate staking app test',
    description: 'Block estate staking app test',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="corporate">
            <body className={inter.className}>
                <WalletProvider>
                    <div className="container mx-auto mt-8 mb-96">
                        <main className="flex flex-col gap-4">
                            <div className="flex flex-col mx-auto gap-4 lg:flex-row">
                                <div className="w-96">
                                    <WalletConnectButton />
                                </div>
                                <div className="w-96">
                                    <BuyButton />
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
