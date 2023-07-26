import { StakeForm } from "./StakeForm";
import { StakingTokenSymbol } from "@/components/StakingTokenSymbol";
import { UserStakingTokenBalance } from "@/components/UserStakingTokenBalance";

export function StakeCardBody() {
    return (
        <div className="card-body">
            <div className="card-title">Stake <StakingTokenSymbol /></div>
            <p className="flex justify-between">
                Balance: <span className="font-medium"><UserStakingTokenBalance /></span>
            </p>
            <StakeForm />
        </div>
    )
}
