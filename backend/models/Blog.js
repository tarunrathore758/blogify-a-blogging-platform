import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    content: { type: String, required: true },
    image:   { type: String },
    author:  { type: String, default: "Anonymous" },
    likes:   { type: Number, default: 0 },
    comments:{ type: [String], default: [] }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
