const userSlices = (set) => {
    return {
        userInfo: null,
        setUserInfo: (userInfo) => set({ userInfo })
    }
}

export default userSlices