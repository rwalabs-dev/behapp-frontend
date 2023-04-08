import "./globals.css";
import { PoolTotalStaked } from "@/components/PoolTotalStaked";
import { UserRewardsTokenBalance } from "@/components/UserRewardsTokenBalance";
import { UserStakingTokenBalance } from "@/components/UserStakingTokenBalance";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { WalletProvider } from "@/components/WalletProvider";

export const metadata = {
    title: 'Staking app test',
    description: 'Staking app test',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <WalletProvider>
                    <div className="container mx-auto">
                        <div className="flex flex-col gap-4 my-4">
                            <div>
                                <WalletConnectButton />
                            </div>
                            <div>
                                Staking token balance: <UserStakingTokenBalance />
                            </div>
                            <div>
                                Reward token balance: <UserRewardsTokenBalance />
                            </div>
                            <div>
                                Pool total staked: <PoolTotalStaked />
                            </div>
                        </div>
                        {children}
                    </div>
                </WalletProvider>
            </body>
        </html>
    )
}
