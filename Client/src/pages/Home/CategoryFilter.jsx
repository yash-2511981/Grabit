
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/store'
import React from 'react'

const CategoryFilterButton = ({ text, value }) => {
    const { setFilter, category } = useAppStore()

    const handleClick = () => {
        setFilter(value)
    }

    return (
        <Button
            className={`p-2 w-25 ${category === value ? "bg-primary hover:bg-primary" : "bg-secondary"} transition-all duration-200`}
            onClick={handleClick}
            variant="ghost"
        >
            {text}
        </Button>

    )
}

export default CategoryFilterButton
