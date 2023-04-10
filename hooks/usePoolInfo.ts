import { useContractReads } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";

export function usePoolInfo() {
    return useContractReads({
        contracts: [
            {
                ...StakingPoolContract,
                functionName: "totalStaked",
            },
            {
                ...StakingPoolContract,
                functionName: "remainingRewards",
            },
            {
                ...StakingPoolContract,
                functionName: "endOfDistribution",
            },
        ],
        watch: true,
        select: data => ({
            totalStaked: data[0],
            remainingRewards: data[1],
            endOfDistribution: data[2],
        })
    })
}
