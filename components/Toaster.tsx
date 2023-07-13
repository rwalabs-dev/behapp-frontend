"use client";

import "react-toastify/dist/ReactToastify.css";

import { useAccount, useContractEvent } from "wagmi";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { StakingPoolContract } from "@/config/contracts";
import { ToastContainer, toast } from "react-toastify";
import { formatUnits } from "viem";

export function Toaster() {
    const tokenInfo = useTokenInfo()
    const { address } = useAccount()

    const stakingSymbol = tokenInfo.data?.staking.symbol ?? ""
    const stakingDecimals = tokenInfo.data?.staking.decimals ?? 0

    const rewardsSymbol = tokenInfo.data?.rewards.symbol ?? ""
    const rewardsDecimals = tokenInfo.data?.rewards.decimals ?? 0

    useContractEvent({
        ...StakingPoolContract,
        eventName: "Stake",
        listener: (events) => {
            events.map(event => {
                if (event.args.addr === address) {
                    toast(`${format(event.args.amount, stakingDecimals)} $${stakingSymbol} staked!`)
                }
            })
        }
    })

    useContractEvent({
        ...StakingPoolContract,
        eventName: "Unstake",
        listener: (events) => {
            events.map(event => {
                if (event.args.addr === address) {
                    toast(`${format(event.args.amount, stakingDecimals)} $${stakingSymbol} unstaked!`)
                }
            })
        }
    })

    useContractEvent({
        ...StakingPoolContract,
        eventName: "Claim",
        listener: (events) => {
            events.map(event => {
                if (event.args.addr === address) {
                    toast(`${format(event.args.amount, rewardsDecimals)} $${rewardsSymbol} claimed!`)
                }
            })
        }
    })

    return <ToastContainer position="top-center" />
}

function format(n: bigint | undefined, decimals: number): string {
    return parseFloat(formatUnits(n ?? 0n, decimals)).toLocaleString("en", { maximumFractionDigits: 2 })
}
