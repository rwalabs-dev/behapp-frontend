import { formatUnits } from "viem"

export function formatk(n: bigint, decimals: number): string {
    const k = n / BigInt(10 ** (decimals + 3))

    return k === 0n ? tostr(n, decimals) : tostr(n, decimals + 3) + "k"
}

function tostr(n: bigint, decimals: number): string {
    return parseFloat(formatUnits(n, decimals)).toLocaleString("en", { maximumFractionDigits: 2 })
}
