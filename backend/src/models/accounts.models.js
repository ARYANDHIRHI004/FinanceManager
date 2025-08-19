import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({},{timestamps:true})

export const Account = mongoose.model("Account", accountSchema)