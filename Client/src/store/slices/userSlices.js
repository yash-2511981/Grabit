import { Orders } from "@/lib/dummy";

const userSlices = (set) => ({
    userInfo: null,
    addresses: [],
    orders: [],
    products: [],
    cartItems: [],
    vegMode: false,
    category: "dish",
    filters: { veg: false, category: "dishes" },
    setFilter: (category) => set({ category }),
    setVegMode: (vegMode) => set({ vegMode }),
    setUserInfo: (userInfo) => set({ userInfo }),
    setAddresses: (addresses) => set({ addresses }),
    setCartItems: (cartItems) => set({ cartItems }),
    setProducts: (products) => set({ products }),
    addAddress: (address) => set((state) => ({
        addresses: [...state.addresses, address]
    })),
    addCartItems: (item) =>
        set((state) => ({
            cartItems: [...state.cartItems, item],
        })),

});

export default userSlices;
