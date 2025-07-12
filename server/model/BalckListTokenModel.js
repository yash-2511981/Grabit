import mongoose, { Schema } from "mongoose";

const blackListTokenSchema = new Schema({
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true }
})

blackListTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const BlackListTokenModel = mongoose.model("blacklisttoken", blackListTokenSchema);
