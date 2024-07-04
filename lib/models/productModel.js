import mongoose from "mongoose";
import Category from "./categoryModel.js"
import User from "./userModel.js"
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  picture: {
    picture_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}
  , { timestamps: true })
const product = mongoose.models.Product || mongoose.model('Product', productSchema)
export default product
