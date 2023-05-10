import { useContractRead, useContractReads } from "wagmi";
import { StakingTokenContract, StakingPoolContract, RewardsTokenContract } from "@/config/contracts";

export function useMinterStats(i: number) {
    const minterAddress = useContractRead({
        ...StakingTokenContract,
        functionName: "minterAddress",
        args: [BigInt(i)]
    })

    const address = minterAddress.data ?? "0x"

    return useContractReads({
        contracts: [
            {
                ...StakingPoolContract,
                functionName: "staked",
                args: [address]
            },
            {
                ...RewardsTokenContract,
                functionName: "balanceOf",
                args: [address]
            },
            {
                ...StakingPoolContract,
                functionName: "pendingRewards",
                args: [address]
            },
        ],
        enabled: minterAddress.isSuccess,
        watch: true,
        select: data => ({
            address,
            staked: data[0].result,
            rewardsBalance: data[1].result,
            pendingRewards: data[2].result,
        }),
    })
}
