import { StakeForm } from "./StakeForm";
import { UserStakingTokenBalance } from "@/components/UserStakingTokenBalance";

export function StakeCardBody() {
    return (
        <div className="card-body pt-4">
            <div className="card-title">Stake tokens</div>
            <p className="flex justify-between">
                Balance: <span className="font-medium"><UserStakingTokenBalance /></span>
            </p>
            <StakeForm />
        </div>
    )
}
