import { useAccount, useContractReads } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";

export function useUserRewards() {
    const { address } = useAccount()

    return useContractReads({
        contracts: [
            {
                ...StakingPoolContract,
                functionName: "pendingRewards",
                args: [address ?? "0x"],
            },
            {
                ...StakingPoolContract,
                functionName: "remainingRewards",
                args: [address ?? "0x"],
            },
        ],
        enabled: !!address,
        scopeKey: address ?? "0x",
        watch: true,
        select: data => ({
            pendingRewards: data[0].result,
            remainingRewards: data[1].result,
        })
    })
}
