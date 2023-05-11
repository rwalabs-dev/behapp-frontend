"use client";

import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function StakingTokenSymbol() {
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess

    const symbol = tokenInfo.data?.staking.symbol ?? ""

    return <span>{loaded ? `\$${symbol}` : '-'}</span>
}
