"use client";

import { useState } from "react";
import { StakeCardBody } from "./StakeCardBody";
import { UnstakeCardBody } from "./UnstakeCardBody";

export function StakeCard() {
    const [tab, setTab] = useState<"stake" | "unstake">("stake")

    return (
        <div className="card card-bordered w-96">
            <div className="tabs tabs-boxed">
                <a className={`tab flex-1 ${tab === "stake" ? 'tab-active' : ''}`} onClick={() => setTab("stake")}>
                    Stake
                </a>
                <a className={`tab flex-1 ${tab === "unstake" ? 'tab-active' : ''}`} onClick={() => setTab("unstake")}>
                    Unstake
                </a>
            </div>
            {tab === "stake" && <StakeCardBody />}
            {tab === "unstake" && <UnstakeCardBody />}
        </div>
    )
}
