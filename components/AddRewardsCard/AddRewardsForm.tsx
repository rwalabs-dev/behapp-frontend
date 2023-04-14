"use client";

import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { RewardsTokenContract, StakingPoolContract } from "@/config/contracts";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigNumber, useBigNumberInput } from "@/modules/bigNumber";
import { Button } from "@/components/Button";

function useApprove() {
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...RewardsTokenContract,
        functionName: "approve",
        args: [StakingPoolContract.address, ethers.constants.MaxUint256],
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            userInfo.refetch()
        }
    })

    return { prepare, action, wait }
}

function useAddRewards(amount: BigNumber, duration: number, reset: () => void) {
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...StakingPoolContract,
        functionName: "addRewards",
        args: [amount, BigNumber.from(duration)],
        enabled: userInfo.isSuccess
            && amount.gt(0)
            && amount.lte(userInfo.data?.rewards.balance ?? 0)
            && amount.lte(userInfo.data?.rewards.allowance ?? 0)
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
    const [duration, setDuration] = useState<number>(0)
    const hasMounted = useHasMounted()

    const allowance = userInfo.data?.rewards.allowance ?? BigNumber.from(0)

    const insufficientAllowance = amount.gt(allowance)

    return (
        <div className="flex flex-col gap-2">
            <div>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={amountStr}
                    onChange={e => setAmountStr.fromStr(e.target.value.trim())}
                />
            </div>
            <div>
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={duration}
                    onChange={e => setDuration(parseInt(e.target.value.trim()))}
                />
            </div>
            <div>
                {hasMounted && insufficientAllowance
                    ? <ApproveButton />
                    : <AddRewardsButton amount={amount} duration={duration} reset={setAmountStr.reset} />}
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
        <Button disabled={disabled} loading={sending} onClick={() => action.write?.()}>
            Approve contract
        </Button>
    )
}

function AddRewardsButton({ amount, duration, reset }: { amount: BigNumber, duration: number, reset: () => void }) {
    const userInfo = useUserInfo()
    const { prepare, action, wait } = useAddRewards(amount, duration, reset)

    const balance = userInfo.data?.rewards.balance ?? BigNumber.from(0)

    const zeroAmount = amount.eq(0)
    const zeroDuration = duration === 0;
    const insufficientBalance = amount.gt(balance)

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || zeroDuration || insufficientBalance || !userInfo.isSuccess || preparing || sending

    return (
        <Button disabled={disabled} loading={sending} onClick={() => action.write?.()}>
            {insufficientBalance ? 'Insufficient balance' : 'Add rewards'}
        </Button>
    )
}
