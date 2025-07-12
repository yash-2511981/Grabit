import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // days or months?
  menu: [{ type: Schema.Types.ObjectId, ref: "product" }],
  price: { type: Number, required: true },
  save: { type: Number, required: true } // discount saved ₹
});

export const SubscriptionModel = mongoose.model("subscription", subscriptionSchema);
