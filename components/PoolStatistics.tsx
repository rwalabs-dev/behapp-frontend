"use client";

import { formatUnits } from "viem";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useNbMinters } from "@/hooks/useNbMinters";
import { useMinterStats } from "@/hooks/useMinterStats";

export function PoolStatistics() {
    const nbMinters = useNbMinters()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && nbMinters.isSuccess

    const nb = nbMinters.data ?? 0n

    return (
        <div className="w-96">
            <p>
                Number of minters: {loaded ? nb.toString() : "-"}
            </p>
            <div className="flex flex-col gap-2">
                {loaded && [...Array(nb)].map((e, i) => <MinterStatLine key={i} i={i} />)}
            </div>
        </div>
    )
}

function MinterStatLine({ i }: { i: number }) {
    const tokenInfo = useTokenInfo()
    const minterStats = useMinterStats(i)

    const stakingSymbol = tokenInfo.data?.staking.symbol ?? "-"
    const stakingDecimals = tokenInfo.data?.staking.decimals ?? 0
    const rewardsSymbol = tokenInfo.data?.rewards.symbol ?? "-"
    const rewardsDecimals = tokenInfo.data?.rewards.decimals ?? 0

    const address = minterStats.data?.address ?? "-"
    const staked = minterStats.data?.staked ?? 0n
    const rewardsBalance = minterStats.data?.rewardsBalance ?? 0n
    const pendingRewards = minterStats.data?.pendingRewards ?? 0n

    return (
        <div>
            <div className="divider">{formatAddress(address)}</div>
            <p className="flex justify-between">
                Staked:
                <span className="font-medium">
                    {formatAmount(staked, stakingDecimals)} ${stakingSymbol}
                </span>
            </p>
            <p className="flex justify-between">
                Rewards balance:
                <span className="font-medium">
                    {formatAmount(rewardsBalance, rewardsDecimals)} ${rewardsSymbol}
                </span>
            </p>
            <p className="flex justify-between">
                Pending rewards:
                <span className="font-medium">
                    {formatAmount(pendingRewards, rewardsDecimals)} ${rewardsSymbol}
                </span>
            </p>
        </div >
    )
}

function formatAddress(address: string) {
    return address.length > 8 ?
        `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
        : address
}

function formatAmount(amount: bigint, decimals: number) {
    return parseFloat(formatUnits(amount, decimals)).toLocaleString()
}
