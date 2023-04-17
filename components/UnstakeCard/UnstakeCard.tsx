import { UnstakeForm } from "./UnstakeForm";

export function UnstakeCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Unstake tokens</div>
                <UnstakeForm />
            </div>
        </div>
    )
}
