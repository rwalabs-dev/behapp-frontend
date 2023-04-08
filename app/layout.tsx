import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'
import { WalletConnectButton } from '@/components/WalletConnectButton'

export const metadata = {
    title: 'Staking app test',
    description: 'Staking app test',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <WalletProvider>
                    <div className="container">
                        <div>
                            <WalletConnectButton />
                        </div>
                        {children}
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
