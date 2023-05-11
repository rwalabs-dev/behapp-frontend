import { PoolTotalStaked } from "@/components/PoolTotalStaked";
import { RewardTokenSymbol } from "@/components/RewardTokenSymbol";
import { StakingTokenSymbol } from "@/components/StakingTokenSymbol";
import { PoolRemainingRewards } from "@/components/PoolRemainingRewards";
import { PoolRemainingSeconds } from "@/components/PoolRemainingSeconds";

export function PoolInfoCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Pool info</div>
                <p className="flex justify-between">
                    Pool total staked: <span className="font-medium"><PoolTotalStaked /> <StakingTokenSymbol /></span>
                </p>
                <p className="flex justify-between">
                    Remaining rewards: <span className="font-medium"><PoolRemainingRewards /> <RewardTokenSymbol /></span>
                </p>
                <p className="flex justify-between">
                    Remaining time: <span className="font-medium"><PoolRemainingSeconds /></span>
                </p>
            </div>
        </div>
    )
}
