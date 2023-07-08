"use client";

import { useAccount, useContractRead } from "wagmi";
import { useHasMounted } from "@/hooks/useHasMounted";
import { StakingPoolContract } from "@/config/contracts";

export function OnlyOperatorRole({ children }: { children: React.ReactNode }) {
    const { address } = useAccount()
    const hasMounted = useHasMounted()

    const getRole = useContractRead({
        ...StakingPoolContract,
        functionName: "OPERATOR_ROLE",
        scopeKey: address,
    })

    const hasRole = useContractRead({
        ...StakingPoolContract,
        functionName: "hasRole",
        args: [getRole.data ?? "0x", address ?? "0x"],
        enabled: !!address && getRole.isSuccess,
        scopeKey: address,
    })

    return hasMounted && hasRole.isSuccess && hasRole.data ? <>{children}</> : null
}
