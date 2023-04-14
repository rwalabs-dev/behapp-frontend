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
            {loaded && timestamp.gt(0) ? format(timestamp.toNumber()) : "-"}
        </span>
    )
}

function format(seconds: number) {
    const date = new Date(0)
    date.setSeconds(seconds)
    return date.toISOString().substring(11, 19)
}
