"use client";

import { formatUnits } from "viem";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function UserRewardTokenBalance() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && userInfo.isSuccess

    const decimals = tokenInfo.data?.rewards.decimals ?? 0
    const balance = userInfo.data?.rewards.balance ?? 0n

    return (
        <span>
            {loaded ? `${parseFloat(formatUnits(balance, decimals)).toLocaleString()}` : '-'}
        </span>
    )
}
