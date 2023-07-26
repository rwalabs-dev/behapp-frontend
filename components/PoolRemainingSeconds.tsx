"use client";

import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

export function PoolRemainingSeconds() {
    const poolInfo = usePoolInfo()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && poolInfo.isSuccess

    const timestamp = poolInfo.data?.remainingSeconds ?? 0n

    return (
        <span>
            {loaded && timestamp > 0 ? format(timestamp) : "-"}
        </span>
    )
}

function format(duration: bigint) {
    const days = duration / 86400n
    const hours = (duration / 3600n) % 24n
    const minutes = (duration / 60n) % 60n
    //const seconds = duration % 60n

    const hoursStr = hours < 10 ? '0' + hours : hours.toString();
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    //const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();

    //const time = [hoursStr, minutesStr, secondsStr].join(':')
    const time = [hoursStr, minutesStr].join(':')

    return days > 0 ? `${days}d ${time}` : time
}
