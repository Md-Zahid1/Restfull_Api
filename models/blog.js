import mongoose from "mongoose";
const Schema = mongoose.Schema

const blogSchema = new Schema([{
    name: { type: String, required: true },
}], { timestamps: true })

export default mongoose.model('Blog', blogSchema, 'blogs')
