"use client";

import { BigNumber } from "ethers";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { StakingTokenContract } from "@/config/contracts";
import { Spinner } from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useHasMounted } from "@/hooks/useHasMounted";

const amount = BigNumber.from(100000)

function useMint() {
    const userInfo = useUserInfo()
    const tokenInfo = useTokenInfo()

    const scale = BigNumber.from(10).pow(tokenInfo.data?.staking.decimals ?? 0)

    const prepare = usePrepareContractWrite({
        ...StakingTokenContract,
        functionName: "mint",
        args: [amount.mul(scale)],
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
            <Spinner enabled={sending} /> Mint staking tokens
        </button>
    )
}
