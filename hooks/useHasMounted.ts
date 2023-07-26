import { useState, useEffect } from "react";

export function useHasMounted() {
    const [hasMounted, setHasMounted] = useState<boolean>(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    return hasMounted
}
