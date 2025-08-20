const checkoutSlices = (set, get) => ({
    orderProducts: [],       // only { product, quantity } for backend order
    displayProducts: [],     // detailed info to display on ui
    orderAmount: 0,
    deliveryCharge: 20,
    platFormFee: 1.5,
    gst: 0, //applying 5% gst on on product price
    orderAddress: null,
    paymentMode: "online",
    isOrderFromCart: false,
    setCheckoutData: (products, amount, isOrderFromCart) => {
        const newOrderProducts = products.map((item) => ({
            product: item._id,
            quantity: item.quantity,
        }))


        set({
            orderProducts: newOrderProducts,
            displayProducts: products,
            orderAmount: amount,
            isOrderFromCart
        })

        get().setOrderAmount()
    },

    increaseQuantity: (id) => {
        const orderProducts = [...get().orderProducts]
        const displayProducts = [...get().displayProducts]

        const index = orderProducts.findIndex((i) => i.product === id)
        const displayIndex = displayProducts.findIndex((i) => i._id === id)

        if (index !== -1) {
            orderProducts[index].quantity += 1
            displayProducts[displayIndex].quantity += 1
            set({ orderProducts, displayProducts })
            get().setOrderAmount()
        }
    },

    decreaseQuantity: (id) => {
        const orderProducts = [...get().orderProducts]
        const displayProducts = [...get().displayProducts]

        const index = orderProducts.findIndex((i) => i.product === id)
        const displayIndex = displayProducts.findIndex((i) => i._id === id)

        if (index !== -1 && orderProducts[index].quantity > 1) {
            orderProducts[index].quantity -= 1
            displayProducts[displayIndex].quantity -= 1
            set({ orderProducts, displayProducts })
            get().setOrderAmount()
        }
    },

    setOrderAddress: (address) => set({ orderAddress: address }),
    setTotalAmount: (amount) => set({ orderAmount: amount }),
    setPaymentMode: (mode) => set({ paymentMode: mode }),
    setOrderAmount: () => {
        const products = get().displayProducts;
        const total = products.reduce((total, item) => total + (item.price * item.quantity), 0)
        const gst = Math.round(total * 0.05)
        set({ orderAmount: total, gst })
    }
})


export default checkoutSlices