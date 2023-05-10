import { formatUnits, parseUnits } from "viem";
import { useState, useMemo, useCallback } from "react";

// parse any string as a BigNumber, fallback to zero
const getBigNumberFromStr = (value: string, decimals: number) => {
    try {
        return parseUnits(value as `${number}`, decimals)
    } catch (e) {
        return 0n
    }
}

// hook to ensure state change only when the BigNumber underlying value actually changes
type UseBigNumberState = [bigint, (newN: bigint) => void]

export const useBigNumber = (init: number): UseBigNumberState => {
    const [value, setValue] = useState<bigint>(BigInt(init))

    const setNewN = useCallback((newN: bigint) => {
        setValue(prev => prev === newN ? prev : newN)
    }, [])

    return [value, setNewN]
}

// hook to keep an input field in sync with a BigNumber
type UseBigNumberInputState = [
    string,
    {
        reset: () => void
        fromBigNumber: (newN: bigint) => void
        fromStr: (newstr: string) => void
    }
]

export const useBigNumberInput = (value: bigint, setValue: (n: bigint) => void, decimals: number): UseBigNumberInputState => {
    const [valueStr, setValueStr] = useState<string>(value === 0n ? '' : formatUnits(value, decimals))

    const reset = useCallback(() => {
        setValue(0n)
        setValueStr('')
    }, [setValue])

    const fromBigNumber = useCallback((newN: bigint) => {
        setValue(newN)
        setValueStr(formatNoZeroCent(formatUnits(newN, decimals)))
    }, [setValue, decimals])

    const fromStr = useCallback((newStr: string) => {
        setValue(getBigNumberFromStr(newStr, decimals))
        setValueStr(newStr)
    }, [setValue, decimals])

    const setAmountInput = useMemo(() => ({ reset, fromBigNumber, fromStr }), [reset, fromBigNumber, fromStr])

    return [valueStr, setAmountInput]
}

const formatNoZeroCent = (value: string) => {
    const parts = value.split('.');

    if (parts.length === 1) return parts[0]
    if (parts[1] === "0") return parts[0]

    return value
}

// shortcut to format a bignumber as a locale string
export const format = (value: bigint, decimals: number) => {
    return parseFloat(formatUnits(value, decimals)).toLocaleString()
}
