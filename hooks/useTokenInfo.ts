import { useContractReads } from "wagmi";
import { StakingTokenContract, RewardsTokenContract } from "@/config/contracts";

export function useTokenInfo() {
    return useContractReads({
        contracts: [
            {
                ...StakingTokenContract,
                functionName: "symbol",
            },
            {
                ...StakingTokenContract,
                functionName: "decimals",
            },
            {
                ...RewardsTokenContract,
                functionName: "symbol",
            },
            {
                ...RewardsTokenContract,
                functionName: "decimals",
            },
        ],
        select: data => ({
            staking: {
                symbol: data[0].result,
                decimals: data[1].result,
            },
            rewards: {
                symbol: data[2].result,
                decimals: data[3].result,
            },
        })
    })
}
