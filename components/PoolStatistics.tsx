"use client";

import { ethers } from "ethers";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useNbMinters } from "@/hooks/useNbMinters";
import { useMinterStats } from "@/hooks/useMinterStats";

export function PoolStatistics() {
    const nbMinters = useNbMinters()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && nbMinters.isSuccess

    const nb = nbMinters.data ?? 0

    return (
        <div>
            <p>
                Number of minters: {loaded ? nb : "-"}
            </p>
            <table>
                <thead>
                    <tr>
                        <th className="w-96">Address</th>
                        <th className="w-48">Staked</th>
                        <th className="w-48">Pending Rewards</th>
                    </tr>
                </thead>
                <tbody>
                    {loaded && [...Array(nb)].map((e, i) => <MinterStatLine key={i} i={i} />)}
                </tbody>
            </table>
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

    const address = minterStats.data?.address ?? 0
    const staked = minterStats.data?.staked ?? 0
    const pendingRewards = minterStats.data?.pendingRewards ?? 0

    return (
        <tr>
            <td className="text-center">
                {address}
            </td>
            <td className="text-center">
                {parseFloat(ethers.utils.formatUnits(staked, stakingDecimals)).toLocaleString()} ${stakingSymbol}
            </td>
            <td className="text-center">
                {parseFloat(ethers.utils.formatUnits(pendingRewards, rewardsDecimals)).toLocaleString()} ${rewardsSymbol}
            </td>
        </tr>
    )
}
