"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { usePendingRewards } from "@/hooks/usePendingRewards";
import { useHasMounted } from "@/hooks/useHasMounted";

function useClaim() {
    const userInfo = useUserInfo()

    const prepare = usePrepareContractWrite({
        ...StakingPoolContract,
        functionName: "claim",
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            userInfo.refetch()
        }
    })

    return { prepare, action, wait }
}

export function ClaimButton() {
    const pendingRewards = usePendingRewards()
    const { prepare, action, wait } = useClaim()
    const hasMounted = useHasMounted()


    const amount = pendingRewards.data ?? 0n

    const zeroAmount = amount === 0n

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = !hasMounted || zeroAmount || !pendingRewards.isSuccess || preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            <Spinner enabled={sending} /> {!hasMounted || zeroAmount ? 'No rewards' : 'Claim rewards'}
        </button>
    )
}
