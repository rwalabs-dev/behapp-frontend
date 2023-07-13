"use client";

import { Spinner } from "@/components/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigintInput } from "@/hooks/useBigintInput";
import { StakingPoolContract } from "@/config/contracts";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";

function useUnstake(amount: bigint, reset: () => void) {
    const userInfo = useUserInfo()
    const poolInfo = usePoolInfo()

    const prepare = usePrepareContractWrite({
        ...StakingPoolContract,
        functionName: "unstake",
        args: [amount],
        enabled: userInfo.isSuccess
            && amount > 0
            && amount <= (userInfo.data?.staking.staked ?? 0),
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

export function UnstakeForm() {
    const tokenInfo = useTokenInfo()
    const amount = useBigintInput(0n, tokenInfo.data?.staking.decimals ?? 0)

    return (
        <div className="flex flex-col gap-2">
            <div className="join">
                <input
                    type="text"
                    className="input input-primary w-full"
                    value={amount.valueStr}
                    onChange={e => amount.setValueStr(e.target.value.trim())}
                />
                <MaxButton setAmount={amount.setValue} />
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

    const staked = userInfo.data?.staking.staked ?? 0n

    const disabled = !hasMounted || !userInfo.isSuccess;

    return (
        <button disabled={disabled} onClick={() => setAmount(staked)} className="btn btn-primary w-16">
            Max
        </button>
    )
}

function SubmitButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const userInfo = useUserInfo()
    const hasMounted = useHasMounted()

    const staked = userInfo.data?.staking.staked ?? 0n

    const insufficientStake = amount > staked

    if (!hasMounted || !userInfo.isSuccess) {
        return (
            <button disabled className="btn btn-primary w-full">
                Unstake tokens
            </button>
        )
    }

    if (insufficientStake) {
        return (
            <button disabled className="btn btn-primary w-full">
                Insufficient stake
            </button>
        )
    }

    return <UnstakeButton amount={amount} reset={reset} />
}

function UnstakeButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const [debouncedAmount, debouncing] = useDebounce(amount)
    const { prepare, action, wait } = useUnstake(debouncedAmount, reset)

    const zeroAmount = amount === 0n

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || preparing || sending || debouncing

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> <span>Unstake tokens</span>
        </button>
    )
}
