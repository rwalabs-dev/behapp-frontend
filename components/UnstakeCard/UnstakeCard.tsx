import { Card } from "@/components/Card";
import { UnstakeForm } from "./UnstakeForm";

export function UnstakeCard() {
    return (
        <Card>
            <Card.Title>
                Unstake tokens
            </Card.Title>
            <UnstakeForm />
        </Card>
    )
}
