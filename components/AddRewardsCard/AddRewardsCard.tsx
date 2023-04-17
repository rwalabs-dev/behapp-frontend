import { AddRewardsForm } from "./AddRewardsForm";

export function AddRewardsCard() {
    return (
        <div className="card card-bordered w-96">
            <div className="card-body">
                <div className="card-title">Add Rewards</div>
                <AddRewardsForm />
            </div>
        </div>
    )
}
