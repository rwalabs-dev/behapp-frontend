"use client";

import { BigNumber } from "ethers";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { UserPendingRewards } from "../UserPendingRewards";
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

export function ClaimForm() {
    return (
        <div className="flex flex-col gap-2 justify-between">
            <div>
                Your pending rewards: <UserPendingRewards />
            </div>
            <div>
                <ClaimButton />
            </div>
        </div>
    )
}

function ClaimButton() {
    const pendingRewards = usePendingRewards()
    const { prepare, action, wait } = useClaim()
    const hasMounted = useHasMounted()


    const amount = pendingRewards.data ?? BigNumber.from(0)

    const zeroAmount = amount.eq(0)

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = !hasMounted || zeroAmount || !pendingRewards.isSuccess || preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-primary w-full">
            {sending ? <Spinner /> : null} {!hasMounted || zeroAmount ? 'No rewards' : 'Claim rewards'}
        </button>
    )
}
