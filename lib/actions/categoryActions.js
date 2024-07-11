"use server"
import { connectDB } from "@/lib/db"
import category from "@/lib/models/categoryModel"
import { createSlug } from "@/lib/utils"
import { revalidatePath } from "next/cache"

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
  await connectDB()
  const data = await category.find({}).lean()
  return data
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
