import { StakeCard } from "@/components/StakeCard";
import { ClaimCard } from "@/components/ClaimCard";
import { UnstakeCard } from "@/components/UnstakeCard";
import { PoolStatistics } from "@/components/PoolStatistics";
import { AddRewardsCard } from "@/components/AddRewardsCard";
import { OnlyAddRewardsRole } from "@/components/OnlyAddRewardsRole";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <div className="flex flex-col mx-auto gap-4 md:flex-row">
                <StakeCard />
                <UnstakeCard />
                <ClaimCard />
            </div>
            <OnlyAddRewardsRole>
                <div className="flex mx-auto">
                    <AddRewardsCard />
                </div>
            </OnlyAddRewardsRole>
            <div className="mx-auto">
                <PoolStatistics />
            </div>
        </main>
    )
}
