"use client";

import { ethers } from "ethers";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useMinterStats } from "@/hooks/useMinterStats";
import { useTokenInfo } from "@/hooks/useTokenInfo";

export function PoolStatistics() {
    const tokenInfo = useTokenInfo()
    const minterStats = useMinterStats()
    const hasMounted = useHasMounted()

    const loaded = hasMounted && tokenInfo.isSuccess && minterStats.isSuccess

    const stats = minterStats.data ?? []
    const stakingSymbol = tokenInfo.data?.staking.symbol ?? "-"
    const stakingDecimals = tokenInfo.data?.staking.decimals ?? 0
    const rewardsSymbol = tokenInfo.data?.rewards.symbol ?? "-"
    const rewardsDecimals = tokenInfo.data?.rewards.decimals ?? 0

    return (
        <div>
            <p>
                Number of minters: {loaded ? stats.length.toString() : "-"}
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
                    {
                        loaded && stats.map((item, i) => (
                            <tr key={i}>
                                <td className="text-center">
                                    {item.address}
                                </td>
                                <td className="text-center">
                                    {parseFloat(ethers.utils.formatUnits(item.staked, stakingDecimals)).toLocaleString()} ${stakingSymbol}
                                </td>
                                <td className="text-center">
                                    {parseFloat(ethers.utils.formatUnits(item.pendingRewards, rewardsDecimals)).toLocaleString()} ${rewardsSymbol}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
