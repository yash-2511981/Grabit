import { Schema } from "mongoose";

const activeSubscriptionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    subscriptionPlan: { type: Schema.Types.ObjectId, ref: "subscription", required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
    mealCount: { type: Number },
    mealTime: { type: String, required: true, enum: ["breakfast", "lunch", "dinner"] }
}, { timestamps: true });
