import { useEffect, useState } from 'react'

const useDebounce = (value, delay = 250) => {
    const [debounceValue, setValue] = useState(value);

    useEffect(() => {
        const handleTimer = setTimeout(() => {
            setValue(value)
        }, delay);

        return () => clearTimeout(handleTimer)
    }, [value, delay])

    return debounceValue
}

export default useDebounce
