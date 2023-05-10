"use client";

import { formatUnits } from "viem";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function PoolTotalStaked() {
    const poolInfo = usePoolInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && poolInfo.isSuccess

    const symbol = tokenInfo.data?.staking.symbol ?? ""
    const decimals = tokenInfo.data?.staking.decimals ?? 0
    const amount = poolInfo.data?.totalStaked ?? 0n

    return (
        <span>
            {loaded ? `${parseFloat(formatUnits(amount, decimals)).toLocaleString()} \$${symbol}` : '-'}
        </span>
    )
}
