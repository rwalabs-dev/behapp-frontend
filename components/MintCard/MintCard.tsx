import { Card } from "@/components/Card";
import { MintForm } from "./MintForm";

export function MintCard() {
    return (
        <Card>
            <Card.Title>
                Mint staking tokens
            </Card.Title>
            <MintForm />
        </Card>
    )
}
