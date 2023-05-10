import { useContractRead } from "wagmi";
import { StakingTokenContract } from "@/config/contracts";

export function useNbMinters() {
    return useContractRead({
        ...StakingTokenContract,
        functionName: "nbMinters",
        watch: true,
        select: data => Number(data)
    })
}
