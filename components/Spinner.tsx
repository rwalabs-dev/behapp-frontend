export function Spinner({ enabled }: { enabled: boolean }) {
    return enabled ? <span className="loading loading-spinner"></span> : null
}
