"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { Spinner } from "@/components/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigintInput } from "@/hooks/useBigintInput";
import { RewardsTokenContract, StakingPoolContract } from "@/config/contracts";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

const d90days = 90 * 24 * 60 * 60

function useApprove() {
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...RewardsTokenContract,
        functionName: "approve",
        args: [StakingPoolContract.address, BigInt(2 ** (256 - 1))],
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            userInfo.refetch()
        }
    })

    return { prepare, action, wait }
}

function useAddRewards(amount: bigint, duration: number, reset: () => void) {
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...StakingPoolContract,
        functionName: "addRewards",
        args: [amount, BigInt(duration)],
        enabled: userInfo.isSuccess
            && amount > 0
            && amount <= (userInfo.data?.rewards.balance ?? 0n)
            && amount <= (userInfo.data?.rewards.allowance ?? 0n)
            && duration > 0,
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            userInfo.refetch()
            reset()
        }
    })

    return { prepare, action, wait }
}

export function AddRewardsForm() {
    const tokenInfo = useTokenInfo()
    const amount = useBigintInput(0n, tokenInfo.data?.rewards.decimals ?? 0)
    const [durationStr, setDurationStr] = useState<string>('')

    const duration = durationStr.trim() === "" ? 0 : parseInt(durationStr.trim())

    const reset = useCallback(() => {
        amount.reset()
        setDurationStr('')
    }, [amount, setDurationStr])

    return (
        <div className="flex flex-col gap-2">
            <div>
                <Link href="/" className="link">Back home</Link>
            </div>
            <div className="form-control">
                <input
                    type="text"
                    className="input input-primary w-full"
                    value={amount.valueStr}
                    onChange={e => amount.setValueStr(e.target.value.trim())}
                />
            </div>
            <div className="form-control">
                <div className="join">
                    <input
                        type="number"
                        step="1"
                        className="input input-primary w-full"
                        value={durationStr}
                        onChange={e => setDurationStr(e.target.value)}
                    />
                    <button onClick={() => setDurationStr(d90days.toString())} className="btn btn-primary w-16">
                        90 days
                    </button>
                </div>
            </div>
            <div>
                <SubmitButton amount={amount.value} duration={duration} reset={reset} />
            </div>
        </div>
    )
}

function SubmitButton({ amount, duration, reset }: { amount: bigint, duration: number, reset: () => void }) {
    const userInfo = useUserInfo()
    const hasMounted = useHasMounted()

    const balance = userInfo.data?.rewards.balance ?? 0n
    const allowance = userInfo.data?.rewards.allowance ?? 0n
    const insufficientBalance = amount > balance
    const insufficientAllowance = amount > allowance

    if (!hasMounted) {
        return (
            <button disabled className="btn btn-primary w-full">
                -
            </button>
        )
    }

    if (insufficientBalance) {
        return (
            <button disabled className="btn btn-primary w-full">
                Insufficient balance
            </button>
        )
    }

    return insufficientAllowance
        ? <ApproveButton />
        : <AddRewardsButton amount={amount} duration={duration} reset={reset} />
}

function ApproveButton() {
    const { prepare, action, wait } = useApprove()

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> Approve contract
        </button>
    )
}

function AddRewardsButton({ amount, duration, reset }: { amount: bigint, duration: number, reset: () => void }) {
    const [debouncedAmount, debouncing1] = useDebounce(amount)
    const [debouncedDuration, debouncing2] = useDebounce(duration)
    const { prepare, action, wait } = useAddRewards(debouncedAmount, debouncedDuration, reset)

    const zeroAmount = amount === 0n
    const zeroDuration = duration === 0;

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount
        || zeroDuration
        || preparing
        || sending
        || debouncing1
        || debouncing2

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} />&nbsp;Add rewards
        </button>
    )
}
