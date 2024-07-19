"use server"
import { connectDB } from "@/lib/db"
import category from "@/lib/models/categoryModel"
import { createSlug } from "@/lib/utils"
import { revalidatePath } from "next/cache"

let cachedCategories = null;
let cacheTimestamp = 0;
// FIX: set method to get latest categories / revalidate with flag
const CACHE_DURATION = 60000 * 5;

export async function createCategory(formData) {
  try {
    await connectDB()
    const name = formData.get("name")
    if (!name) throw new Error("Please enter category name")
    const slug = createSlug(name)
    if (await category.findOne({ slug })) throw new Error("Category already exists")
    const data = await category.create({ name, slug })
    revalidatePath("/admin/categories")
    return { ok: true, error: null }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function getCategories() {
  try {
    if (cachedCategories && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return cachedCategories;
    }
    await connectDB()
    console.log("SLOW... getting categories")
    const data = await category.find().lean()
    cachedCategories = data;
    cacheTimestamp = Date.now();
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
export async function deleteCategory(id) {
  try {
    if (!id) throw new Error("No id provided")
    await connectDB()
    if (!await category.findOne({ _id: id })) throw new Error("Category not found")
    const data = await category.findByIdAndDelete(id)
    revalidatePath("/admin/categories")
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function updateCategory(id, formData) {
  try {
    await connectDB()
    if (!id) throw new Error("No id provided")
    if (!await category.findOne({ _id: id })) throw new Error("Category not found")
    const name = formData.get("name")
    if (!name) throw new Error("Please enter category name")
    const slug = createSlug(name)
    const data = await category.findByIdAndUpdate(id, { name, slug })
    revalidatePath("/admin/categories")
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
