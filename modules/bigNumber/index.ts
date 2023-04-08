import { BigNumber, utils } from "ethers"
import { useState, useMemo, useCallback } from "react"

// parse any string as a BigNumber, fallback to zero
const getBigNumberFromStr = (value: string, decimals: number) => {
    try {
        return utils.parseUnits(value, decimals)
    } catch (e) {
        return BigNumber.from(0)
    }
}

// hook to ensure state change only when the BigNumber underlying value actually changes
type UseBigNumberState = [BigNumber, (newN: BigNumber) => void]

export const useBigNumber = (init: number): UseBigNumberState => {
    const [value, setValue] = useState<BigNumber>(BigNumber.from(init))

    const setNewN = useCallback((newN: BigNumber) => {
        setValue(prev => prev.eq(newN) ? prev : newN)
    }, [])

    return [value, setNewN]
}

// hook to keep an input field in sync with a BigNumber
type UseBigNumberInputState = [
    string,
    {
        reset: () => void
        fromBigNumber: (newN: BigNumber) => void
        fromStr: (newstr: string) => void
    }
]

export const useBigNumberInput = (value: BigNumber, setValue: (n: BigNumber) => void, decimals: number): UseBigNumberInputState => {
    const [valueStr, setValueStr] = useState<string>(value.eq(0) ? '' : utils.formatUnits(value, decimals))

    const reset = useCallback(() => {
        setValue(BigNumber.from(0))
        setValueStr('')
    }, [setValue])

    const fromBigNumber = useCallback((newN: BigNumber) => {
        setValue(newN)
        setValueStr(formatNoZeroCent(utils.formatUnits(newN, decimals)))
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
export const format = (value: BigNumber, decimals: number) => {
    return parseFloat(utils.formatUnits(value, decimals)).toLocaleString()
}
