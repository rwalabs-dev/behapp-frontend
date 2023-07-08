import { useState, useCallback } from "react";
import { formatUnits, parseUnits } from "viem";

// hook to keep an input field in sync with a Bigint
type UseBigintInputState = {
    value: bigint,
    valueStr: string,
    reset: () => void
    setValue: (newN: bigint) => void
    setValueStr: (newstr: string) => void
}

export const useBigintInput = (init: bigint, decimals: number): UseBigintInputState => {
    const [value, setValueRaw] = useState<bigint>(init)
    const [valueStr, setValueStrRaw] = useState<string>(formatStr(value, decimals))

    const reset = useCallback(() => {
        setValueRaw(0n)
        setValueStr('')
    }, [])

    const setValue = useCallback((newN: bigint) => {
        setValueRaw(newN)
        setValueStrRaw(formatStr(newN, decimals))
    }, [decimals])

    const setValueStr = useCallback((newStr: string) => {
        setValueRaw(parseStr(newStr, decimals))
        setValueStrRaw(newStr)
    }, [decimals])

    return { value, valueStr, reset, setValue, setValueStr }
}

const parseStr = (value: string, decimals: number) => {
    try {
        return parseUnits(value as `${number}`, decimals)
    } catch (e) {
        return 0n
    }
}

const formatStr = (value: bigint, decimals: number) => {
    if (value === 0n) return ''

    return formatNoZeroCent(formatUnits(value, decimals))
}

const formatNoZeroCent = (value: string) => {
    const parts = value.split('.');

    if (parts.length === 1) return parts[0]
    if (parts[1] === "0") return parts[0]

    return value
}
