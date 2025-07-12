import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  name: { type: String, required: true },
  mealCount: { type: Number, required: true }, // days or months?
  menu: [{ type: Schema.Types.ObjectId, ref: "product" }],
  price: { type: Number, required: true },
  save: { type: Number, required: true }, // discount saved ₹
  mealTime: { type: Date, required: true }
});

export const SubscriptionModel = mongoose.model("subscription", subscriptionSchema);
