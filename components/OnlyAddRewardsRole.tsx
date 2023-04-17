"use client";

import { useAccount, useContractRead } from "wagmi";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { StakingPoolContract } from "@/config/contracts";

export function OnlyAddRewardsRole({ children }: { children: React.ReactNode }) {
    const { address } = useAccount()
    const poolInfo = usePoolInfo()
    const hasMounted = useHasMounted()

    const hasRole = useContractRead({
        ...StakingPoolContract,
        functionName: "hasRole",
        args: [poolInfo.data?.addRewardsRole ?? "0x", address ?? "0x"],
        enabled: !!address && poolInfo.isSuccess,
    })

    return hasMounted && hasRole.isSuccess && hasRole.data ? <>{children}</> : null
}
