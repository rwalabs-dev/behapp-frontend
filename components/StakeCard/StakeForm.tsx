"use client";

import { BigNumber, ethers } from "ethers";
import { useState, useCallback } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingTokenContract, StakingPoolContract } from "@/config/contracts";
import { Button } from "@/components/Button";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigNumber, useBigNumberInput } from "@/modules/bigNumber";

function useApprove() {
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...StakingTokenContract,
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

function useStake(amount: BigNumber) {
    const appInfo = useUserInfo()
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...StakingPoolContract,
        functionName: "stake",
        args: [amount],
        enabled: userInfo.isSuccess
            && amount.gt(0)
            && amount.lte(userInfo.data?.staking.balance ?? 0)
            && amount.lte(userInfo.data?.staking.allowance ?? 0),
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            appInfo.refetch()
            userInfo.refetch()
        }
    })

    return { prepare, action, wait }
}

export function StakeForm() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()
    const [amount, setAmount] = useBigNumber(0)
    const [amountStr, setAmountStr] = useBigNumberInput(amount, setAmount, tokenInfo.data?.staking.decimals ?? 0)
    const hasMounted = useHasMounted()

    const allowance = userInfo.data?.staking.allowance ?? BigNumber.from(0)

    const insufficientAllowance = amount.gt(allowance)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={amountStr}
                    onChange={e => setAmountStr.fromStr(e.target.value.trim())}
                />
                <MaxButton setAmount={setAmountStr.fromBigNumber} />
            </div>
            <div>
                {hasMounted && insufficientAllowance ? <ApproveButton /> : <StakeButton amount={amount} />}
            </div>
        </div>
    )
}

function MaxButton({ setAmount }: { setAmount: (amount: BigNumber) => void }) {
    const userInfo = useUserInfo()
    const hasMounted = useHasMounted()

    const balance = userInfo.data?.staking.balance ?? BigNumber.from(0)

    const disabled = !hasMounted || !userInfo.isSuccess;

    return (
        <Button disabled={disabled} onClick={() => setAmount(balance)}>
            Max
        </Button>
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

function StakeButton({ amount }: { amount: BigNumber }) {
    const userInfo = useUserInfo()
    const { prepare, action, wait } = useStake(amount)

    const balance = userInfo.data?.staking.balance ?? BigNumber.from(0)

    const zeroAmount = amount.eq(0)
    const insufficientBalance = amount.gt(balance)

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || insufficientBalance || !userInfo.isSuccess || preparing || sending

    return (
        <Button disabled={disabled} loading={sending} onClick={() => action.write?.()}>
            {insufficientBalance ? 'Insufficient balance' : 'Stake tokens'}
        </Button>
    )
}
