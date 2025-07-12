import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: Number, required: true }
});

export const RestaurantModel = mongoose.model("restaurant", restaurantSchema);
