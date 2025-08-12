import { ProductModel } from "../../model/ProductModel.js"
import { UserModel } from "../../model/UserModel.js"

export const getCartItems = async (req, res) => {
    const { id } = req.data

    try {
        const user = await UserModel.findById(id)

        if (!user) {
            return res.status(401).send("Unauthorized request")
        }

        const { cart } = user.toObject()

        const cartItems = await Promise.all(
            cart.map(async (item) => {
                const product = await ProductModel.findById(item.product)
                return { ...product.toObject(), quantity: item.quantity }
            })
        )

        res.status(200).json({ cartItems })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error.Try again later")
    }
}

export const addToCart = async (req, res) => {
    try {
        const { id } = req.data;
        let { productId } = req.body;

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const user = await UserModel.findOne({ _id: id, "cart.product": product.id });
        let quantity;
        if (user) {
            const result = await UserModel.findOneAndUpdate(
                { _id: id, "cart.product": product.id },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            );

            const cartItem = result.cart.find(item => item.product.toString() === product.id);
            quantity = cartItem.quantity;
        } else {
            const result = await UserModel.findByIdAndUpdate(
                id,
                {
                    $push: {
                        cart: { product: product.id, quantity: 1 }
                    }
                },
                { new: true }
            );
            quantity = 1;
        }

        res.status(200).json({ ...product.toObject(), quantity })

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteCartItem = async (req, res) => {
    const { id } = req.data;
    const { productId } = req.params
    try {
        await UserModel.findByIdAndUpdate(id, {
            $pull: {
                cart: { product: productId }
            }
        })

        res.status(200).send("Item removed from cart")

    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error. Try again later")
    }
}

export const updateCartItems = async (req, res) => {
    const { id } = req.data;
    const { cartItems } = req.body

    try {
        for (const item of cartItems) {
            await UserModel.updateOne(
                { _id: id, "cart.product": item.productId },
                { $set: { "cart.$.quantity": item.quantity } }
            );
        }

        res.status(200).send("cart updated")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error. Try again later")
    }
}