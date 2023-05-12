import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, ms: number = 200): [T, boolean] {
    const [debounced, setDebounced] = useState<T>(value)
    const [debouncing, setDebouncing] = useState<boolean>(false)

    useEffect(() => {
        setDebouncing(true)

        const timeout = setTimeout(() => {
            setDebounced(value)
            setDebouncing(false)
        }, ms)

        return () => { clearTimeout(timeout) }
    }, [value, ms])

    return [debounced, debouncing]
}
