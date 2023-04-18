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

function format(duration: number) {
    const days = Math.floor(duration / 86400)
    const hours = Math.floor(duration / 3600) % 24
    const minutes = Math.floor(duration / 60) % 60
    const seconds = duration % 60

    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;

    const time = [hoursStr, minutesStr, secondsStr].join(':')

    return days > 0 ? `${days} days ${time}` : time
}
