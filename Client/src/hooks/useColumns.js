import { useEffect, useState } from 'react'

const useColumns = () => {
    const getColumns = (width) => {
        if (width >= 1280) return 5;
        if (width >= 1024) return 4;
        if (width >= 768) return 3;
        return 2;
    }
    const [column, setColumn] = useState(
        typeof window !== 'undefined' ? getColumns(window.innerWidth) : 0
    );


    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setColumn(getColumns(window.innerWidth))
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return column;
}

export default useColumns
