import mongoose, { Schema } from "mongoose"

const adminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

export const AdminModel = mongoose.model("admin", adminSchema)