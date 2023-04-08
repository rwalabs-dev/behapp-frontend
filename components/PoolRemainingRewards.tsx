"use client";

import { BigNumber, ethers } from "ethers";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function PoolRemainingRewards() {
    const poolInfo = usePoolInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && poolInfo.isSuccess

    const symbol = tokenInfo.data?.rewards.symbol ?? ""
    const decimals = tokenInfo.data?.rewards.decimals ?? 0
    const amount = poolInfo.data?.remainingRewards ?? BigNumber.from(0)

    return (
        <span>
            {loaded ? `${parseFloat(ethers.utils.formatUnits(amount, decimals)).toLocaleString()} \$${symbol}` : '-'}
        </span>
    )
}
