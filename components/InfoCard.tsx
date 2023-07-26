import { PoolTotalStaked } from "@/components/PoolTotalStaked";
import { UserStakedAmount } from "@/components/UserStakedAmount";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { StakingTokenSymbol } from "@/components/StakingTokenSymbol";
import { PoolRemainingRewards } from "@/components/PoolRemainingRewards";
import { PoolRemainingSeconds } from "@/components/PoolRemainingSeconds";
import { UserRewardTokenBalance } from "@/components/UserRewardTokenBalance";
import { UserStakingTokenBalance } from "@/components/UserStakingTokenBalance";

export function InfoCard() {
    return (
        <div className="card card-primary w-96 lg:w-[50rem]">
            <div className="flex flex-col gap-8 lg:flex-row">
                <div className="card-body">
                    <div className="card-title">Pool info</div>
                    <p className="flex justify-between">
                        Pool total staked: <span className="font-bold"><PoolTotalStaked /> <StakingTokenSymbol /></span>
                    </p>
                    <p className="flex justify-between">
                        Remaining rewards: <span className="font-bold"><PoolRemainingRewards /> <RewardTokenSymbol /></span>
                    </p>
                    <p className="flex justify-between">
                        Remaining time: <span className="font-bold"><PoolRemainingSeconds /></span>
                    </p>
                </div>
                <div className="card-body">
                    <div className="card-title">Your account info</div>
                    <p className="flex justify-between">
                        <span>Your <span className="font-bold"><StakingTokenSymbol /></span> balance:</span>
                        <span className="font-bold"><UserStakingTokenBalance /></span>
                    </p>
                    <p className="flex justify-between">
                        <span>Your <span className="font-bold"><RewardTokenSymbol /></span> balance:</span>
                        <span className="font-bold"><UserRewardTokenBalance /></span>
                    </p>
                    <p className="flex justify-between">
                        <span>Your staked <span className="font-bold"><StakingTokenSymbol /></span> amount:</span>
                        <span className="font-bold"><UserStakedAmount /></span>
                    </p>
                </div>
            </div>
        </div>
    )
}
