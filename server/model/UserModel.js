import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  preference: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  cart: [{
    product: { type: Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 1 }
  }],
});

export const UserModel = mongoose.model("user", userSchema);
