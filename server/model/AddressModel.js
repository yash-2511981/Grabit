import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    roomNo: { type: String, required: true },
    buildingName: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String },
    pincode: { type: String, required: true }
}, { timestamps: true });

export const AddressModel = mongoose.model("address", addressSchema);
