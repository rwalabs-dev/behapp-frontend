import { ClaimButton } from "./ClaimButton";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { UserPendingRewards } from "@/components/UserPendingRewards";

export function ClaimCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Claim <RewardTokenSymbol /> Rewards</div>
                <p className="flex justify-between">
                    Pending rewards: <span className="font-medium"><UserPendingRewards /></span>
                </p>
                <div>
                    <ClaimButton />
                </div>
            </div>
        </div>
    )
}
