"use client";

import { BigNumber, ethers } from "ethers";
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
    const balance = poolInfo.data?.totalStaked ?? BigNumber.from(0)

    return (
        <span>
            {loaded ? `${parseFloat(ethers.utils.formatUnits(balance, decimals)).toLocaleString()} \$${symbol}` : '-'}
        </span>
    )
}
