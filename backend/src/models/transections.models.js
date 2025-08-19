import mongoose from "mongoose";

const transectionSchema = new mongoose.Schema({},{timestamps:true})

export const Transection = mongoose.model("Transection", transectionSchema)