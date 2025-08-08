import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  category: { type: String, enum: ["veg", "non-veg", "both"], default: "both" },
  phone: { type: String, required: true },
  pincode: { type: Number, required: true },
  password: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
  imageUrl: { type: String },
  status: { type: String, enum: ["open", "close"] }
}, { timestamps: true });

export const RestaurantModel = mongoose.model("restaurant", restaurantSchema);
