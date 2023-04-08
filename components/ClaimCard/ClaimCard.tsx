import { Card } from "@/components/Card";
import { ClaimForm } from "./ClaimForm";

export function ClaimCard() {
    return (
        <Card>
            <Card.Title>
                Claim rewards
            </Card.Title>
            <ClaimForm />
        </Card>
    )
}
