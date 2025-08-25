import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    deliveryBoy: { type: Schema.Types.ObjectId }, //TODO:need to add reference module
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "product", required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    address: { type: String },
    amount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["confirm", "packed", "picked", "on the way", "delivered", "pending", "cancelled"],
        default: "pending",
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
    gst: { type: Number, required: true },
    platFormFee: { type: Number, required: true },
    createdFromSubscriptions: { type: Boolean, default: false },
    isRated: { type: Boolean }
}, { timestamps: true });

export const OrderModel = mongoose.model("order", orderSchema);
