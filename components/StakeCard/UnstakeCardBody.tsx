import { UnstakeForm } from "./UnstakeForm";
import { UserStakedAmount } from "@/components/UserStakedAmount";
import { StakingTokenSymbol } from "@/components/StakingTokenSymbol";

export function UnstakeCardBody() {
    return (
        <div className="card-body pt-4">
            <div className="card-title">Unstake <StakingTokenSymbol /></div>
            <p className="flex justify-between">
                Staked: <span className="font-medium"><UserStakedAmount /></span>
            </p>
            <UnstakeForm />
        </div>
    )
}
