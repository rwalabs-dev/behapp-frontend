import { MintCard } from "@/components/MintCard";
import { StakeCard } from "@/components/StakeCard";

export default function Home() {
    return (
        <main className="flex mx-auto gap-4">
            <MintCard />
            <StakeCard />
        </main>
    )
}
