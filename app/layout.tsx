import "./globals.css";

import { Inter } from 'next/font/google';
import { WalletProvider } from "@/components/WalletProvider";

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
                        {children}
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
