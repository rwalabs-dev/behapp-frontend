import { Card } from "@/components/Card";
import { MintButton } from "./MintButton";

export function MintCard() {
    return (
        <Card>
            <Card.Title>
                Mint staking tokens
            </Card.Title>
            <MintButton />
        </Card>
    )
}
