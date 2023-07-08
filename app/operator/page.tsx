import { AddRewardsCard } from "@/components/AddRewardsCard";
import { OnlyOperatorRole } from "@/components/OnlyOperatorRole";

export default function Admin() {
    return (
        <OnlyOperatorRole>
            <div className="mx-auto">
                <AddRewardsCard />
            </div>
        </OnlyOperatorRole>
    )
}
