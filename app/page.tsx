import { StakeCard } from "@/components/StakeCard";
import { ClaimCard } from "@/components/ClaimCard";
import { MintButton } from "@/components/MintButton";
import { PoolInfoCard } from "@/components/PoolInfoCard";
import { UserInfoCard } from "@/components/UserInfoCard";
import { AddRewardsCard } from "@/components/AddRewardsCard";
import { OnlyAddRewardsRole } from "@/components/OnlyAddRewardsRole";
import { WalletConnectButton } from "@/components/WalletConnectButton";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <div className="flex flex-col mx-auto gap-4 lg:flex-row">
                <div className="w-96">
                    <WalletConnectButton />
                </div>
                <div className="w-96">
                    <MintButton />
                </div>
            </div>
            <div className="flex flex-col mx-auto gap-4 lg:flex-row">
                <PoolInfoCard />
                <UserInfoCard />
            </div>
            <div className="flex flex-col mx-auto gap-4 lg:flex-row">
                <StakeCard />
                <ClaimCard />
            </div>
            <OnlyAddRewardsRole>
                <div className="mx-auto">
                    <AddRewardsCard />
                </div>
            </OnlyAddRewardsRole>
        </main>
    )
}
