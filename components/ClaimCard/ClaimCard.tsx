import { ClaimForm } from "./ClaimForm";

export function ClaimCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Claim Rewards</div>
                <ClaimForm />
            </div>
        </div>
    )
}
