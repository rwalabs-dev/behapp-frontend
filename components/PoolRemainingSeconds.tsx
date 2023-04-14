"use client";

import { BigNumber } from "ethers";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function PoolRemainingSeconds() {
    const poolInfo = usePoolInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && poolInfo.isSuccess

    const timestamp = poolInfo.data?.remainingSeconds ?? BigNumber.from(0)

    return (
        <span>
            {
                loaded && timestamp.gt(0)
                    ? new Date(timestamp.toNumber() * 1000).toLocaleString()
                    : "-"
            }
        </span>
    )
}
