import { Card } from "@/components/Card";
import { StakeForm } from "./StakeForm";

export function StakeCard() {
    return (
        <Card>
            <Card.Title>
                Stake tokens
            </Card.Title>
            <StakeForm />
        </Card>
    )
}
