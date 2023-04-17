import { StakeForm } from "./StakeForm";

export function StakeCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Stake tokens</div>
                <StakeForm />
            </div>
        </div>
    )
}
