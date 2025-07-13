import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["veg", "non-veg", "both"], default: "Both" },
  restaurant: { type: Schema.Types.ObjectId, ref: "restaurant", required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export const ProductModel = mongoose.model("product", productSchema);
