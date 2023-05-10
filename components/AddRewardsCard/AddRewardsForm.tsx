"use client";

import { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { RewardsTokenContract, StakingPoolContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigNumber, useBigNumberInput } from "@/modules/bigNumber";
import { useCallback } from "react";

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
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()
    const [amount, setAmount] = useBigNumber(0)
    const [amountStr, setAmountStr] = useBigNumberInput(amount, setAmount, tokenInfo.data?.rewards.decimals ?? 0)
    const [durationStr, setDurationStr] = useState<string>('')
    const hasMounted = useHasMounted()

    const allowance = userInfo.data?.rewards.allowance ?? 0n
    const duration = durationStr.trim() === "" ? 0 : parseInt(durationStr.trim())

    const insufficientAllowance = amount > allowance

    const reset = useCallback(() => {
        setAmountStr.reset()
        setDurationStr('')
    }, [setAmountStr, setDurationStr])

    return (
        <div className="flex flex-col gap-2">
            <div>
                <input
                    type="text"
                    className="input input-primary w-full"
                    value={amountStr}
                    onChange={e => setAmountStr.fromStr(e.target.value.trim())}
                />
            </div>
            <div>
                <input
                    type="number"
                    step="1"
                    className="input input-primary w-full"
                    value={durationStr}
                    onChange={e => setDurationStr(e.target.value)}
                />
            </div>
            <div>
                {hasMounted && insufficientAllowance
                    ? <ApproveButton />
                    : <AddRewardsButton amount={amount} duration={duration} reset={reset} />}
            </div>
        </div>
    )
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
    const userInfo = useUserInfo()
    const { prepare, action, wait } = useAddRewards(amount, duration, reset)

    const balance = userInfo.data?.rewards.balance ?? 0n

    const zeroAmount = amount === 0n
    const zeroDuration = duration === 0;
    const insufficientBalance = amount > balance

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || zeroDuration || insufficientBalance || !userInfo.isSuccess || preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> {insufficientBalance ? 'Insufficient balance' : 'Add rewards'}
        </button>
    )
}
