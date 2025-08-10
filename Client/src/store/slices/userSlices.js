const userSlices = (set, get) => ({
    userInfo: null,
    addresses: [],
    orders: [],
    products: [],
    cartItems: [],
    restaurants: [],
    subscriptions: [],
    vegMode: false,
    category: "dish",
    setCategory: (category) => set({ category }),
    setVegMode: (vegMode) => set({ vegMode }),
    setUserInfo: (userInfo) => set({ userInfo }),
    setAddresses: (addresses) => set({ addresses }),
    setCartItems: (cartItems) => set({ cartItems }),
    setProducts: (products) => set({ products }),
    setRestaurants: (restaurants) => set({ restaurants }),
    setSubscriptions: (subscriptions) => set({ subscriptions }),
    addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, address]
    })),
    addCartItem: (item) => {
        console.log(item)
        const prevCart = get().cartItems
        console.log(prevCart)
        const index = prevCart.findIndex(prodcut => prodcut._id === item._id)
        console.log(index)

        if (index !== -1) {
            const updatedCart = [...prevCart]
            updatedCart[index] = { ...updatedCart[index], quantity: item.quantity }
            set({ cartItems: updatedCart })
        } else {
            set({ cartItems: [...prevCart, item] })
        }
    }

});

export default userSlices;
