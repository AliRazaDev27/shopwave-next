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
    const oneStars = reviews.filter((review) => review.rating === 1).length
    const twoStars = reviews.filter((review) => review.rating === 2).length
    const threeStars = reviews.filter((review) => review.rating === 3).length
    const fourStars = reviews.filter((review) => review.rating === 4).length
    const fiveStars = reviews.filter((review) => review.rating === 5).length
    return { card: { total, positive, negative, average }, chart: { oneStars, twoStars, threeStars, fourStars, fiveStars } }
  }
  catch (error) {
    throw new Error(error.message)
  }
}
