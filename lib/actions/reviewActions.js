"use server"
import { connectDB } from "@/lib/db";
import review from "@/lib/models/reviewModel";
import product from "@/lib/models/productModel";


export async function getReviews(productID) {
  try {
    await connectDB()
    console.log(productID)
    const reviews = await product.findById(productID).populate("reviews").select("reviews").lean()
    console.log(`pro...`)
    console.log(reviews)
    return reviews
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function reviewsOverview() {
  try {
    await connectDB()
    const reviews = await review.find().select("_id rating").lean()
    const total = reviews.length
    const positive = reviews.filter((review) => review.rating > 3).length
    const negative = reviews.filter((review) => review.rating < 3).length
    const average = (reviews.reduce((acc, review) => acc + review.rating, 0) / total).toFixed(2)
    return { total, positive, negative, average }
  }
  catch (error) {
    throw new Error(error.message)
  }
}
