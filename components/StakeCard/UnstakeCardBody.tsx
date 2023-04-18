import { UnstakeForm } from "./UnstakeForm";
import { UserStakedAmount } from "@/components/UserStakedAmount";

export function UnstakeCardBody() {
    return (
        <div className="card-body pt-4">
            <div className="card-title">Unstake tokens</div>
            <p className="flex justify-between">
                Staked: <span className="font-medium"><UserStakedAmount /></span>
            </p>
            <UnstakeForm />
        </div>
    )
}
