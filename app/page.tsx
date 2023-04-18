import { StakeCard } from "@/components/StakeCard";
import { ClaimCard } from "@/components/ClaimCard";
import { PoolStatistics } from "@/components/PoolStatistics";
import { AddRewardsCard } from "@/components/AddRewardsCard";
import { OnlyAddRewardsRole } from "@/components/OnlyAddRewardsRole";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <div className="flex flex-col mx-auto gap-4">
                <StakeCard />
                <ClaimCard />
                <OnlyAddRewardsRole>
                    <AddRewardsCard />
                </OnlyAddRewardsRole>
            </div>
            <div className="mx-auto">
                <PoolStatistics />
            </div>
        </main>
    )
}
