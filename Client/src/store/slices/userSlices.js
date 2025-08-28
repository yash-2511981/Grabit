
const userSlices = (set, get) => ({
    userInfo: null,
    addresses: [],
    completedOrders: [],
    pendingOrders: [],
    products: [],
    cartItems: [],
    restaurants: [],
    subscriptions: [],
    vegMode: false,
    category: "dish",
    moveIndex: null,
    menuItems: [],
    showMenu: false,
    showMenuRestaurant: {},
    setShowMenu: (showMenu) => set({ showMenu }),
    setShowMenuRestaurant: (showMenuRestaurant) => set({ showMenuRestaurant }),
    setMoveIndex: (moveIndex) => set({ moveIndex }),
    setCategory: (category) => set({ category }),
    setVegMode: (vegMode) => set({ vegMode }),
    setUserInfo: (userInfo) => set({ userInfo }),
    setOrdersDetails: (completedOrders, pendingOrders) => set({ completedOrders, pendingOrders }),
    setAddresses: (addresses) => set({ addresses }),
    setCartItems: (cartItems) => set({ cartItems }),
    setProducts: (products) => set({ products }),
    setRestaurants: (restaurants) => set({ restaurants }),
    setSubscriptions: (subscriptions) => set({ subscriptions }),
    addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, address]
    })),
    addCartItem: (item) => {
        const prevCart = [...get().cartItems]
        set({ cartItems: [...prevCart, item] })
    },
    increaseCartItemQuantity: (id) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.map(item =>
            item._id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        set({ cartItems: updatedCartItems });
    },
    decreaseCartItemQuantity: (id) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.map(item =>
            item._id === id
                ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Prevent going below 1
                : item
        );
        set({ cartItems: updatedCartItems });
    },
    setCartItemQuantity: (id, quantity) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.map(item =>
            item._id === id
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
        );
        set({ cartItems: updatedCartItems });
    },
    removeFromCart: (id) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        set({ cartItems: updatedCartItems });
    },
    clearCart: () => {
        set({ cartItems: [] });
    },
    getCartTotal: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    getCartItemCount: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    },
    productIsInCart: (id) => {
        const products = get().cartItems
        const index = products.findIndex(item => item._id === id)
        if (index !== -1)
            return true;
        else
            return false;
    },
    updatePendingOrders: (order) => {
        const prevOrders = get().pendingOrders
        const newOrders = [...prevOrders, order]
        set({ pendingOrders: newOrders })
    },
    removePendingOrder: (id) => {
        const pendingOrders = [...get().pendingOrders]
        const index = pendingOrders.findIndex(p => p._id === id)

        if (index !== -1)
            pendingOrders.splice(index, 1)

        set({ pendingOrders })
    },
    reorderOnLastProductCardClick: (index = null) => {
        if (index === null) {
            index = get().moveIndex;
            if (index === null) return;
            set({ moveIndex: null })
        } else {
            set({ moveIndex: index });
        }

        const products = [...get().products];

        const [item] = products.splice(index - 1, 1);
        products.splice(index, 0, item);
        set({ products })
    },
});

export default userSlices;
