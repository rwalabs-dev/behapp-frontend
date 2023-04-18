import { UserPendingRewards } from "@/components/UserPendingRewards";
import { UserRewardsTokenBalance } from "@/components/UserRewardsTokenBalance";
import { ClaimButton } from "./ClaimButton";

export function ClaimCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Claim Rewards</div>
                <p className="flex justify-between">
                    Balance: <span className="font-medium"><UserRewardsTokenBalance /></span>
                </p>
                <p className="flex justify-between">
                    Pending rewards: <span className="font-medium"><UserPendingRewards /></span>
                </p>
                <div>
                    <ClaimButton />
                </div>
            </div>
        </div >
    )
}
