import "./globals.css";
import { MintButton } from "@/components/MintButton";
import { PoolTotalStaked } from "@/components/PoolTotalStaked";
import { UserStakedAmount } from "@/components/UserStakedAmount";
import { PoolRemainingRewards } from "@/components/PoolRemainingRewards";
import { PoolRemainingSeconds } from "@/components/PoolRemainingSeconds";
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
        <html lang="en" data-theme="corporate">
            <body className="mb-96">
                <WalletProvider>
                    <div className="container mx-auto">
                        <div className="flex justify-center">
                            <WalletConnectButton />
                        </div>
                        <div className="flex flex-col gap-2 m-12 w-96 mx-auto">
                            <div className="flex justify-between">
                                Pool total staked: <span className="font-medium"><PoolTotalStaked /></span>
                            </div>
                            <div className="flex justify-between">
                                Remaining rewards: <span className="font-medium"><PoolRemainingRewards /></span>
                            </div>
                            <div className="flex justify-between">
                                Remaining time: <span className="font-medium"><PoolRemainingSeconds /></span>
                            </div>
                            <div className="w-96 mx-auto">
                                <MintButton />
                            </div>
                        </div>
                    </div>
                    {children}
                </WalletProvider>
            </body>
        </html>
    )
}
