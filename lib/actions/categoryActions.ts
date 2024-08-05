"use server"
import { connectDB } from "@/lib/db"
import category from "@/lib/models/categoryModel"
import { createSlug } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { CategoryType } from "../types/types_category"
import { ObjectId } from "mongoose"

let cachedCategories:CategoryType[]|null = null;
let cacheTimestamp = 0;
// FIX: set method to get latest categories / revalidate with flag
const CACHE_DURATION = 60000 * 5;

export async function createCategory(formData:FormData) {
  try {
    await connectDB()
    const name = formData.get("name")
    if (!name) throw new Error("Please enter category name")
    const slug: string = createSlug(name as string)
    if (await category.findOne({ slug })) throw new Error("Category already exists")
    const data = await category.create({ name, slug })
    revalidatePath("/admin/categories")
    return { ok: true, error: null }
  } catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function getCategories() {
  try {
    if (cachedCategories && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return cachedCategories;
    }
    await connectDB()
    const data:CategoryType[] = await category.find().lean()
    cachedCategories = data;
    cacheTimestamp = Date.now();
    return data
  } catch (error:any) {
    throw new Error(error.message)
  }
}
export async function deleteCategory(id:ObjectId) {
  try {
    if (!id) throw new Error("No id provided")
    await connectDB()
    if (!await category.findOne({ _id: id })) throw new Error("Category not found")
    await category.findByIdAndDelete(id)
    revalidatePath("/admin/categories")
    return { ok: true, error: null }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function updateCategory(id:ObjectId, formData:FormData) {
  try {
    await connectDB()
    if (!id) throw new Error("No id provided")
    if (!await category.findOne({ _id: id })) throw new Error("Category not found")
    const name = formData.get("name")
    if (!name) throw new Error("Please enter category name")
    const slug = createSlug(name as string)
    const data = await category.findByIdAndUpdate(id, { name, slug })
    revalidatePath("/admin/categories")
    return { ok: true, error: null }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
