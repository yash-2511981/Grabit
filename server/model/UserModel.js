import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  cart: [{
    product: { type: Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 1 }
  }],
  profilesetup: { type: Boolean, default: false }
}, { timestamps: true });

export const UserModel = mongoose.model("user", userSchema);
