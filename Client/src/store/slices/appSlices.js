const appSlices = (set) => {
    return {
        loading: false,
        setLoading: (loading) => set({ loading })
    }
}

export default appSlices