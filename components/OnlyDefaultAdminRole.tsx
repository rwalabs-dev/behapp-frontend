"use client";

import { useAccount, useContractRead } from "wagmi";
import { useHasMounted } from "@/hooks/useHasMounted";
import { StakingPoolContract } from "@/config/contracts";

export function OnlyDefaultAdminRole({ children }: { children: React.ReactNode }) {
    const { address } = useAccount()
    const hasMounted = useHasMounted()

    const hasRole = useContractRead({
        ...StakingPoolContract,
        functionName: "hasRole",
        args: ["0x0000000000000000000000000000000000000000000000000000000000000000", address ?? "0x"],
        enabled: !!address,
    })

    return hasMounted && hasRole.isSuccess && hasRole.data ? <>{children}</> : null
}
