import { useAccount, useContractRead } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";

export function usePendingRewards() {
    const { address } = useAccount()

    return useContractRead({
        ...StakingPoolContract,
        functionName: "pendingRewards",
        args: [address ?? "0x"],
        enabled: !!address,
        scopeKey: address ?? "0x",
        watch: true,
    })
}
