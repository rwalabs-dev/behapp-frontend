"use client";

import { BigNumber } from "ethers";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useBigNumber, useBigNumberInput } from "@/modules/bigNumber";

function useUnstake(amount: BigNumber, reset: () => void) {
    const userInfo = useUserInfo()
    const poolInfo = usePoolInfo()

    const prepare = usePrepareContractWrite({
        ...StakingPoolContract,
        functionName: "unstake",
        args: [amount],
        enabled: userInfo.isSuccess
            && amount.gt(0)
            && amount.lte(userInfo.data?.staking.staked ?? 0),
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

function MaxButton({ setAmount }: { setAmount: (amount: BigNumber) => void }) {
    const userInfo = useUserInfo()
    const hasMounted = useHasMounted()

    const staked = userInfo.data?.staking.staked ?? BigNumber.from(0)

    const disabled = !hasMounted || !userInfo.isSuccess;

    return (
        <button disabled={disabled} onClick={() => setAmount(staked)} className="btn btn-primary w-16">
            Max
        </button>
    )
}

function UnstakeButton({ amount, reset }: { amount: BigNumber, reset: () => void }) {
    const userInfo = useUserInfo()
    const { prepare, action, wait } = useUnstake(amount, reset)

    const staked = userInfo.data?.staking.staked ?? BigNumber.from(0)

    const zeroAmount = amount.eq(0)
    const insufficientStaked = amount.gt(staked)

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || insufficientStaked || !userInfo.isSuccess || preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            {sending ? <Spinner /> : null} {insufficientStaked ? 'Insufficient stake' : 'Unstake tokens'}
        </button>
    )
}
