"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigNumber, useBigNumberInput } from "@/modules/bigNumber";

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
    const [amount, setAmount] = useBigNumber(0)
    const [amountStr, setAmountStr] = useBigNumberInput(amount, setAmount, tokenInfo.data?.staking.decimals ?? 0)

    return (
        <div className="flex flex-col gap-2">
            <div className="input-group">
                <input
                    type="text"
                    className="input input-primary w-full"
                    value={amountStr}
                    onChange={e => setAmountStr.fromStr(e.target.value.trim())}
                />
                <MaxButton setAmount={setAmountStr.fromBigNumber} />
            </div>
            <div>
                <UnstakeButton amount={amount} reset={setAmountStr.reset} />
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

function UnstakeButton({ amount, reset }: { amount: bigint, reset: () => void }) {
    const userInfo = useUserInfo()
    const [debouncedAmount, debouncing] = useDebounce(amount)
    const { prepare, action, wait } = useUnstake(debouncedAmount, reset)

    const staked = userInfo.data?.staking.staked ?? 0n

    const zeroAmount = amount === 0n
    const insufficientStaked = amount > staked

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || insufficientStaked || !userInfo.isSuccess || preparing || sending || debouncing

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> {insufficientStaked ? 'Insufficient stake' : 'Unstake tokens'}
        </button>
    )
}
