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
                symbol: data[0],
                decimals: data[1],
            },
            rewards: {
                symbol: data[2],
                decimals: data[3],
            },
        })
    })
}
