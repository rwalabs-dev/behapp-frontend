"use client";

import { formatUnits } from "viem";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useUserRewards } from "@/hooks/useUserRewards";

export function UserRemainingRewards() {
    const tokenInfo = useTokenInfo()
    const userRewards = useUserRewards()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && userRewards.isSuccess

    const decimals = tokenInfo.data?.rewards.decimals ?? 0
    const amount = userRewards.data?.remainingRewards ?? 0n

    return (
        <span>
            {loaded ? `${parseFloat(formatUnits(amount, decimals)).toLocaleString()}` : '-'}
        </span>
    )
}
