"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { usePendingRewards } from "@/hooks/usePendingRewards";

export function UserPendingRewards() {
    const tokenInfo = useTokenInfo()
    const pendingRewards = usePendingRewards()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && pendingRewards.isSuccess

    const decimals = tokenInfo.data?.rewards.decimals ?? 0
    const amount = pendingRewards.data ?? 0n

    return (
        <span>
            {loaded ? `${parseFloat(formatUnits(amount, decimals)).toLocaleString()}` : '-'}
        </span>
    )
}
