"use client";

import { formatk } from "@/utils";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function UserStakedAmount() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && userInfo.isSuccess

    const decimals = tokenInfo.data?.staking.decimals ?? 0
    const amount = userInfo.data?.staking.staked ?? 0n

    return (
        <span>
            {loaded ? formatk(amount, decimals) : '-'}
        </span>
    )
}
