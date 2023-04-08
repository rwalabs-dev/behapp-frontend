"use client";

import { BigNumber, ethers } from "ethers";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function UserRewardsTokenBalance() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && userInfo.isSuccess

    const symbol = tokenInfo.data?.rewards.symbol ?? ""
    const decimals = tokenInfo.data?.rewards.decimals ?? 0
    const balance = userInfo.data?.rewards.balance ?? BigNumber.from(0)

    return (
        <span>
            {loaded ? `${parseFloat(ethers.utils.formatUnits(balance, decimals)).toLocaleString()} \$${symbol}` : '-'}
        </span>
    )
}
