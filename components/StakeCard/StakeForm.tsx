"use client";

import { Spinner } from "@/components/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigintInput } from "@/hooks/useBigintInput";
import { StakingTokenContract, StakingPoolContract } from "@/config/contracts";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

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
    const tokenInfo = useTokenInfo()
    const amount = useBigintInput(0n, tokenInfo.data?.staking.decimals ?? 0)

    return (
        <div className="flex flex-col gap-2">
            <div className="form-control">
                <div className="join">
                    <input
                        type="text"
                        className="input input-primary w-full"
                        value={amount.valueStr}
                        onChange={e => amount.setValueStr(e.target.value.trim())}
                    />
                    <MaxButton setAmount={amount.setValue} />
                </div>
            </div>
            <div>
                <SubmitButton amount={amount.value} reset={amount.reset} />
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

function SubmitButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const userInfo = useUserInfo()
    const hasMounted = useHasMounted()

    const balance = userInfo.data?.staking.balance ?? 0n
    const allowance = userInfo.data?.staking.allowance ?? 0n
    const insufficientBalance = amount > balance
    const insufficientAllowance = amount > allowance

    if (!hasMounted || !userInfo.isSuccess) {
        return (
            <button disabled className="btn btn-primary w-full">
                Stake tokens
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

    if (insufficientAllowance) {
        return <ApproveButton />
    }

    return <StakeButton amount={amount} reset={reset} />
}

function ApproveButton() {
    const { prepare, action, wait } = useApprove()

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> <span>Approve contract</span>
        </button>
    )
}

function StakeButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const [debouncedAmount, debouncing] = useDebounce(amount)
    const { prepare, action, wait } = useStake(debouncedAmount, reset)

    const zeroAmount = amount === 0n

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || preparing || sending || debouncing

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> <span>Stake tokens</span>
        </button>
    )
}
