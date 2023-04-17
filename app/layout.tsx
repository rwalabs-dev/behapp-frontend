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
        <html lang="en" data-theme="cmyk">
            <body className="mb-96">
                <WalletProvider>
                    <div className="container mx-auto">
                        <div className="flex justify-center">
                            <WalletConnectButton />
                        </div>
                        <div className="flex flex-col gap-8 m-12">
                            <div className="flex flex-col gap-4 justify-center md:flex-row">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        Staking token balance: <UserStakingTokenBalance />
                                    </div>
                                    <div>
                                        Reward token balance: <UserRewardsTokenBalance />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        Your staked amount: <UserStakedAmount />
                                    </div>
                                    <div>
                                        Pool total staked: <PoolTotalStaked />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-xl">
                                Remaining rewards: <PoolRemainingRewards />
                            </div>
                            <div className="text-center text-xl">
                                Remaining time: <PoolRemainingSeconds />
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
