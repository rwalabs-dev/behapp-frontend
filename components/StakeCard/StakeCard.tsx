"use client";

import { useState } from "react";
import { StakeCardBody } from "./StakeCardBody";
import { UnstakeCardBody } from "./UnstakeCardBody";
import { StakeTabs } from "./StakeTabs";

export function StakeCard() {
    const [tab, setTab] = useState<"stake" | "unstake">("stake")

    return (
        <div className="card card-primary w-96">
            <StakeTabs tab={tab} setTab={setTab} />
            {tab === "stake" && <StakeCardBody />}
            {tab === "unstake" && <UnstakeCardBody />}
        </div>
    )
}
