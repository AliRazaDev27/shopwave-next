import mongoose from "mongoose";
import brand from "./brandModel";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  thumbnail: {
    picture_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true
  },
  warrantyInformation: {
    type: String,
    default: "No warranty"
  },
  shippingInformation: {
    type: String,
    default: "shipping in 7 business days"
  },

}, { timestamps: true })
const product = mongoose.models.Product || mongoose.model('Product', productSchema)
export default product
