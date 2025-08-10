import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, required: true, ref: "restaurant" },
  name: { type: String, required: true },
  mealCount: { type: Number, required: true },
  menu: [{ type: Schema.Types.ObjectId, ref: "product" }],
  price: { type: Number, required: true },
  save: { type: Number, required: true },
  mealTime: { type: Date, required: true }
}, { timestamps: true });

export const SubscriptionModel = mongoose.model("subscription", subscriptionSchema);
