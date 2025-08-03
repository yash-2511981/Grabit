const userSlices = (set) => ({
    userInfo: null,
    addresses: [],
    orders: null,
    cartItems: [],
    vegMode: false,
    category: "dish",
    filters: { veg: false, category: "dishes" },
    setFilter: (category) => set({ category }),
    setVegMode: (vegMode) => set({ vegMode }),
    setUserInfo: (userInfo) => set({ userInfo }),
    setAddress: (address) => set((state) => ({
        ...state.addresses, ...address
    })),
    addCartItems: (item) =>
        set((state) => ({
            cartItems: [...state.cartItems, item],
        })),
});

export default userSlices;
