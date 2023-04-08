import { useContractReads } from "wagmi";
import { StakingPoolContract } from "@/config/contracts";

export function usePoolInfo() {
    return useContractReads({
        contracts: [
            {
                ...StakingPoolContract,
                functionName: "totalStaked",
            },
        ],
        select: (data) => ({
            totalStaked: data[0],
        })
    })
}
