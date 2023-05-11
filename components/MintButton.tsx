"use client";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingTokenContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";
import { StakingTokenSymbol } from "@/components/StakingTokenSymbol";

const amount = 100000n

function useMint() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()

    const scale = BigInt(10 ** (tokenInfo.data?.staking.decimals ?? 0))

    const prepare = usePrepareContractWrite({
        ...StakingTokenContract,
        functionName: "mint",
        args: [amount * scale],
        enabled: tokenInfo.isSuccess,
    })

    const action = useContractWrite(prepare.config)

    const wait = useWaitForTransaction({
        hash: action.data?.hash, onSuccess() {
            userInfo.refetch()
        }
    })

    return { prepare, action, wait }
}

export function MintButton() {
    const { prepare, action, wait } = useMint()
    const hasMounted = useHasMounted()

    const preparing = prepare.isLoading || prepare.isError || !action.write
    const sending = action.isLoading || wait.isLoading
    const disabled = !hasMounted || preparing || sending

    return (
        <button disabled={disabled} onClick={() => action.write?.()} className="btn btn-secondary w-full">
            {!hasMounted ? <Spinner enabled /> : <><Spinner enabled={sending} /> Mint&nbsp;<StakingTokenSymbol />&nbsp;tokens</>}
        </button>
    )
}
