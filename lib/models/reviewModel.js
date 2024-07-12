import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true })

const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema)
export default reviewModel
