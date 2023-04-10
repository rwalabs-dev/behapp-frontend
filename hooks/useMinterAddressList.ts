import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";
import { StakingTokenContract } from "@/config/contracts";
import { useNbMinters } from "./useNbMinters";

export function useMinterAddressList() {
    const nbMinters = useNbMinters();

    const nb = nbMinters.data ?? 0

    const contracts = [...new Array(nb)].map((e, i) => ({
        ...StakingTokenContract,
        functionName: "minterAddress",
        args: [BigNumber.from(i)]
    }))

    return useContractReads({
        contracts,
        enabled: nbMinters.isSuccess && nb > 0,
        select: data => {
            const flat: Record<`0x${string}`, boolean> = {}

            data.map(address => flat[address as `0x${string}`] = true)

            return Object.keys(flat)
        },
    })
}
