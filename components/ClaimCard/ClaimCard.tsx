import { ClaimButton } from "./ClaimButton";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { UserPendingRewards } from "@/components/UserPendingRewards";
import { UserRemainingRewards } from "@/components/UserRemainingRewards";

export function ClaimCard() {
    return (
        <div className="card card-secondary w-96">
            <div className="card-body">
                <div className="card-title">Claim <RewardTokenSymbol /> Rewards</div>
                <p className="flex justify-between">
                    Pending rewards: <span className="font-medium"><UserPendingRewards /></span>
                </p>
                <p className="flex justify-between">
                    Remaining rewards: <span className="font-medium"><UserRemainingRewards /></span>
                </p>
                <div className="flex flex-col justify-end flex-grow">
                    <ClaimButton />
                </div>
            </div>
        </div>
    )
}
