"use server"
import { connectDB } from "@/lib/db";
import review from "@/lib/models/reviewModel";
import product from "@/lib/models/productModel";
import { ObjectId } from "mongoose";
import { ReviewType } from "../types/types_review";

export async function getReviews(id:ObjectId) {
  try {
    await connectDB()
    const reviews:ReviewType[]|null = await product.findById(id).populate("reviews").select("reviews").lean()
    if(reviews === null) throw new Error("Product not found")
    return reviews
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function reviewsOverview() {
  try {
    await connectDB()
    const reviews:ReviewType[]|null = await review.find().select("_id rating").lean()
    if(reviews === null) throw new Error("Reviews not found")
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
  catch (error:any) {
    throw new Error(error.message)
  }
}
