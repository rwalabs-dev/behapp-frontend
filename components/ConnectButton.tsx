"use client";

import { useAccount, useNetwork } from "wagmi";
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useHasMounted } from "@/hooks/useHasMounted";

export function ConnectButton() {
    const { chain } = useNetwork()
    const { isConnected, address } = useAccount()
    const { openChainModal } = useChainModal()
    const { openConnectModal } = useConnectModal()
    const { openAccountModal } = useAccountModal()
    const hasMounted = useHasMounted()

    if (!hasMounted) return <FallbackButton />

    if (!isConnected) return (
        <button className="btn btn-primary w-full" onClick={openConnectModal}>
            Connect wallet
        </button>
    )

    if (chain?.unsupported) return (
        <button className="btn btn-primary w-full" onClick={openChainModal}>
            Wrong chain
        </button>
    )

    return (
        <button className="btn btn-primary w-full" onClick={openAccountModal}>
            {formatAddress(address)}
        </button>
    )
}

function FallbackButton() {
    return (
        <button className="btn w-full" disabled={true}>
            <div className="w-16 h-5"></div>
        </button>
    )
}

function formatAddress(address: `0x${string}` | undefined) {
    return address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : ""
}
