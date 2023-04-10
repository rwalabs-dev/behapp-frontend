import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";
import { useMinterAddressList } from "./useMinterAddressList";

export function useMinterStats() {
    const minterAddressList = useMinterAddressList()

    const addresses = minterAddressList.data ?? []

    const contracts = []

    for (const address of addresses) {
        contracts.push(...[
            {
                ...StakingPoolContract,
                functionName: "staked",
                args: [address]
            },
            {
                ...StakingPoolContract,
                functionName: "pendingRewards",
                args: [address]
            },
        ])
    }

    return useContractReads({
        contracts,
        enabled: minterAddressList.isSuccess && addresses.length > 0,
        watch: true,
        select: data => {
            const results: Array<{
                address: string
                staked: BigNumber
                pendingRewards: BigNumber
            }> = []

            for (let i = 0; i < addresses.length; i++) {
                results.push({
                    address: addresses[i],
                    staked: data[i * 2] as BigNumber,
                    pendingRewards: data[i * 2 + 1] as BigNumber,
                })
            }

            return results
        },
    })
}
