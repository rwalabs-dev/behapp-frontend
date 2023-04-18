"use client";

import { BigNumber, ethers } from "ethers";
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

function useStake(amount: BigNumber, reset: () => void) {
    const userInfo = useUserInfo()
    const poolInfo = usePoolInfo()

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

    const allowance = userInfo.data?.staking.allowance ?? BigNumber.from(0)

    const insufficientAllowance = amount.gt(allowance)

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

function MaxButton({ setAmount }: { setAmount: (amount: BigNumber) => void }) {
    const userInfo = useUserInfo()
    const hasMounted = useHasMounted()

    const balance = userInfo.data?.staking.balance ?? BigNumber.from(0)

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

function StakeButton({ amount, reset }: { amount: BigNumber, reset: () => void }) {
    const userInfo = useUserInfo()
    const { prepare, action, wait } = useStake(amount, reset)

    const balance = userInfo.data?.staking.balance ?? BigNumber.from(0)

    const zeroAmount = amount.eq(0)
    const insufficientBalance = amount.gt(balance)

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = zeroAmount || insufficientBalance || !userInfo.isSuccess || preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> {insufficientBalance ? 'Insufficient balance' : 'Stake tokens'}
        </button>
    )
}
