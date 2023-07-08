import { StakeCard } from "@/components/StakeCard";
import { ClaimCard } from "@/components/ClaimCard";
import { PoolInfoCard } from "@/components/PoolInfoCard";
import { UserInfoCard } from "@/components/UserInfoCard";

export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col mx-auto gap-4 lg:flex-row">
                <PoolInfoCard />
                <UserInfoCard />
            </div>
            <div className="flex flex-col mx-auto gap-4 lg:flex-row">
                <StakeCard />
                <ClaimCard />
            </div>
        </div>
    )
}
