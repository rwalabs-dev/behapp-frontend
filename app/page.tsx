import { MintCard } from "@/components/MintCard";
import { StakeCard } from "@/components/StakeCard";
import { ClaimCard } from "@/components/ClaimCard";
import { UnstakeCard } from "@/components/UnstakeCard";

export default function Home() {
    return (
        <main className="flex flex-col gap-4">
            <div className="flex flex-col mx-auto gap-4 md:flex-row">
                <MintCard />
                <ClaimCard />
            </div>
            <div className="flex flex-col mx-auto gap-4 md:flex-row">
                <StakeCard />
                <UnstakeCard />
            </div>
        </main>
    )
}
