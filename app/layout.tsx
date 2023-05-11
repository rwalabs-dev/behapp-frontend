import "./globals.css";

import { WalletProvider } from "@/components/WalletProvider";

export const metadata = {
    title: 'Staking app test',
    description: 'Staking app test',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="corporate">
            <body>
                <WalletProvider>
                    <div className="container mx-auto mt-8 mb-96">
                        {children}
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
