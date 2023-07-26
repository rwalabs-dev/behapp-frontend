import { InfoCard } from "@/components/InfoCard";
import { StakeCard } from "@/components/StakeCard";
import { ClaimCard } from "@/components/ClaimCard";

export default function Home() {
    return (
        <div className="flex flex-col gap-8 mx-auto">
            <InfoCard />
            <div className="flex flex-col gap-8 lg:flex-row">
                <StakeCard />
                <ClaimCard />
            </div>
        </div>
    )
}
