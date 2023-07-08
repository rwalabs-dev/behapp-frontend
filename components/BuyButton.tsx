import Link from "next/link";

import { StakingTokenSymbol } from "@/components/StakingTokenSymbol";

export function BuyButton() {
    return (
        <Link href="https://app.uniswap.org/#/swap" target="_blank" rel="noreferrer" className="btn btn-secondary w-full">
            Buy&nbsp;<StakingTokenSymbol />&nbsp;tokens
        </Link>
    )
}
