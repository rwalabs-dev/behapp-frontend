type TabProps = {
    tab: "stake" | "unstake"
    setTab: (tab: "stake" | "unstake") => void
}

export function StakeTabs({ tab, setTab }: TabProps) {
    return (
        <div className="flex">
            <StakeTab tab={tab} setTab={setTab} />
            <UnstakeTab tab={tab} setTab={setTab} />
        </div>
    )
}

function StakeTab({ tab, setTab }: TabProps) {
    if (tab === "stake") return (
        <span className="tab tab-active">
            Stake
        </span>
    )

    return (
        <a className="tab" onClick={() => setTab("stake")}>
            Stake
        </a>
    )
}

function UnstakeTab({ tab, setTab }: TabProps) {
    if (tab === "unstake") return (
        <span className="tab tab-active">
            Unstake
        </span>
    )

    return (
        <a className="tab" onClick={() => setTab("unstake")}>
            Unstake
        </a>
    )
}
