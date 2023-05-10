import { useContractReads } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";

export function usePoolInfo() {
    return useContractReads({
        contracts: [
            {
                ...StakingPoolContract,
                functionName: "stakedAmountStored",
            },
            {
                ...StakingPoolContract,
                functionName: "remainingRewards",
            },
            {
                ...StakingPoolContract,
                functionName: "remainingSeconds",
            },
            {
                ...StakingPoolContract,
                functionName: "ADD_REWARDS_ROLE",
            }
        ],
        watch: true,
        select: data => ({
            totalStaked: data[0].result,
            remainingRewards: data[1].result,
            remainingSeconds: data[2].result,
            addRewardsRole: data[3].result,
        })
    })
}
