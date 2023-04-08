"use client";

import { BigNumber, ethers } from "ethers";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { usePendingRewards } from "@/hooks/usePendingRewards";

export function UserPendingRewards() {
    const tokenInfo = useTokenInfo()
    const pendingRewards = usePendingRewards()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && pendingRewards.isSuccess

    const symbol = tokenInfo.data?.rewards.symbol ?? ""
    const decimals = tokenInfo.data?.rewards.decimals ?? 0
    const amount = pendingRewards.data ?? BigNumber.from(0)

    return (
        <span>
            {loaded ? `${parseFloat(ethers.utils.formatUnits(amount, decimals)).toLocaleString()} \$${symbol}` : '-'}
        </span>
    )
}
