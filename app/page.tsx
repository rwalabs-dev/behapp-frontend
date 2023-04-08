import { MintCard } from "@/components/MintCard";
import { StakeCard } from "@/components/StakeCard";
import { UnstakeCard } from "@/components/UnstakeCard";

export default function Home() {
    return (
        <main className="flex gap-4 justify-center">
            <MintCard />
            <StakeCard />
            <UnstakeCard />
        </main>
    )
}
