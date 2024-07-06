"use server"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import fs from "fs/promises"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import { connectDB } from "./db"
import product from "@/lib/models/productModel"
import category from "@/lib/models/categoryModel"
import user from "@/lib/models/userModel"
import { uploadImageOnCloudinary, deleteImageFromCloudinary } from "./cloudinaryHelper"
import { createSlug } from "./utils"
export async function getProducts() {
  await connectDB()
  const data = await product.find({}).populate("category").populate("user").sort({ createdAt: -1 }).limit(10).lean()
  console.log(typeof data)
  console.log(data[0])
  return data
}
export async function deleteProduct(id) {
  try {
    const session = await auth()
    const user = session?.user
    if (user?.role !== 1) throw new AuthError("Unauthorized")
    await connectDB()
    const _product = await product.findById(id)
    if (!_product) throw new Error("Product not found")
    if (_product.picture.public_id != "null") {
      await deleteImageFromCloudinary(_product.picture.public_id)
    }
    const isDeleted = await product.findByIdAndDelete(id)
    revalidatePath("/admin/products")
    return { ok: true, error: null }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function getProduct(id) {
  await connectDB()
  const _product = await product.findById(id).populate("category").populate("user").lean()
  return _product
}
