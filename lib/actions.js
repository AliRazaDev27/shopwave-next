"use server"
import { createKey } from "next/dist/shared/lib/router/router"
import { connectDB } from "./db"
import product from "@/lib/models/productModel"
import category from "@/lib/models/categoryModel"
import user from "@/lib/models/userModel"
export async function getProducts() {
  await connectDB()
  const data = await product.find({}).populate("category").populate("user").sort({ createdAt: -1 }).limit(10).lean()
  console.log(data[0])
  return data
}
export async function addProduct(formData) {
  await connectDB()
  // const data = await product.create(formData)
  console.log(formData)
}
