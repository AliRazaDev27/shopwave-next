import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 32
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
}, { timestamps: true })

const category = mongoose.models.Category || mongoose.model('Category', categorySchema)
export default category
