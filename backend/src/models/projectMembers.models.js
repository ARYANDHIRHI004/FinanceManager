import mongoose from "mongoose";

const projectMamberSchema = new mongoose.Schema({},{timestamps:true})

export const ProjectMamber = mongoose.model("ProjectMamber", projectMamberSchema)