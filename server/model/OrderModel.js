import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "product", required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    address: {
        type: Schema.Types.ObjectId,
        ref: "address",
    },
    amount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["confirm", "packed", "picked", "on the way", "delivered", "pending"],
        default: "pendung",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paymentMode: { type: String, enum: ["cod", "online"] },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveryCharge: { type: Number, default: 40 },
    createdFromSubscriptions: { type: Boolean, default: false }
}, { timestamps: true });

export const OrderModel = mongoose.model("order", orderSchema);
