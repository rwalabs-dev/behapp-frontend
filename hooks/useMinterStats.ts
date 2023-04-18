import { BigNumber } from "ethers";
import { useContractRead, useContractReads } from "wagmi";
import { StakingTokenContract, StakingPoolContract, RewardsTokenContract } from "@/config/contracts";

export function useMinterStats(i: number) {
    const minterAddress = useContractRead({
        ...StakingTokenContract,
        functionName: "minterAddress",
        args: [BigNumber.from(i)]
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
            staked: data[0],
            rewardsBalance: data[1],
            pendingRewards: data[2],
        }),
    })
}
