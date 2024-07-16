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
