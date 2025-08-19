import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({},{timestamps:true})

export const Category = mongoose.model("Category", categoriesSchema)