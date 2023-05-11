import { UserStakedAmount } from "@/components/UserStakedAmount";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { StakingTokenSymbol } from "@/components/StakingTokenSymbol";
import { UserRewardTokenBalance } from "@/components/UserRewardTokenBalance";
import { UserStakingTokenBalance } from "@/components/UserStakingTokenBalance";

export function UserInfoCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Your account info</div>
                <p className="flex justify-between">
                    <span>Your <span className="font-medium"><StakingTokenSymbol /></span> balance:</span>
                    <span className="font-medium"><UserStakingTokenBalance /></span>
                </p>
                <p className="flex justify-between">
                    <span>Your <span className="font-medium"><RewardTokenSymbol /></span> balance:</span>
                    <span className="font-medium"><UserRewardTokenBalance /></span>
                </p>
                <p className="flex justify-between">
                    Your staked amount: <span className="font-medium"><UserStakedAmount /></span>
                </p>
            </div>
        </div>
    )
}
