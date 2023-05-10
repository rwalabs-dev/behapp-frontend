"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingTokenContract, StakingPoolContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigNumber, useBigNumberInput } from "@/modules/bigNumber";

function useApprove() {
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...StakingTokenContract,
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

function useStake(amount: bigint, reset: () => void) {
    const userInfo = useUserInfo()
    const poolInfo = usePoolInfo()

    const prepare = usePrepareContractWrite({
        ...StakingPoolContract,
        functionName: "stake",
        args: [amount],
        enabled: userInfo.isSuccess
            && amount > 0
            && amount <= (userInfo.data?.staking.balance ?? 0n)
            && amount <= (userInfo.data?.staking.allowance ?? 0n),
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            userInfo.refetch()
            poolInfo.refetch()
            reset()
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

    const allowance = userInfo.data?.staking.allowance ?? 0n

    const insufficientAllowance = amount > allowance

    return (
        <div className="flex flex-col gap-2">
            <div className="form-control">
                <div className="input-group">
                    <input
                        type="text"
                        className="input input-primary w-full"
                        value={amountStr}
                        onChange={e => setAmountStr.fromStr(e.target.value.trim())}
                    />
                    <MaxButton setAmount={setAmountStr.fromBigNumber} />
                </div>
            </div>
            <div>
                {hasMounted && insufficientAllowance
                    ? <ApproveButton />
                    : <StakeButton amount={amount} reset={setAmountStr.reset} />}
            </div>
        </div>
    )
}

function MaxButton({ setAmount }: { setAmount: (amount: bigint) => void }) {
    const userInfo = useUserInfo()
    const hasMounted = useHasMounted()

    const balance = userInfo.data?.staking.balance ?? 0n

    const disabled = !hasMounted || !userInfo.isSuccess;

    return (
        <button disabled={disabled} onClick={() => setAmount(balance)} className="btn btn-primary w-16">
            Max
        </button>
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

function StakeButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const userInfo = useUserInfo()
    const { prepare, action, wait } = useStake(amount, reset)

    const balance = userInfo.data?.staking.balance ?? 0n

    const zeroAmount = amount === 0n
    const insufficientBalance = amount > balance

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || insufficientBalance || !userInfo.isSuccess || preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> {insufficientBalance ? 'Insufficient balance' : 'Stake tokens'}
        </button>
    )
}
