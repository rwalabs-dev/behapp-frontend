import { useAccount, useContractReads } from "wagmi";
import { StakingTokenContract, RewardsTokenContract, StakingPoolContract } from "@/config/contracts";

export function useUserInfo() {
    const { address } = useAccount()

    return useContractReads({
        contracts: [
            {
                ...StakingTokenContract,
                functionName: "allowance",
                args: [address ?? "0x", StakingPoolContract.address],
            },
            {
                ...StakingTokenContract,
                functionName: "balanceOf",
                args: [address ?? "0x"],
            },
            {
                ...StakingPoolContract,
                functionName: "staked",
                args: [address ?? "0x"],
            },
            {
                ...RewardsTokenContract,
                functionName: "balanceOf",
                args: [address ?? "0x"],
            },
        ],
        enabled: !!address,
        scopeKey: address ?? "0x",
        select: data => ({
            staking: {
                allowance: data[0],
                balance: data[1],
                staked: data[2],
            },
            rewards: {
                balance: data[3],
            },
        })
    })
}
