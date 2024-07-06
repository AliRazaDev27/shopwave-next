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
export async function getProduct(id) {
  await connectDB()
  const _product = await product.findById(id).populate("category").populate("user").lean()
  return _product
}

export async function addProduct(formData) {
  // const data = await product.create(formData)
  const session = await auth()
  await connectDB()
  const file = formData.get("image")
  const image = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  try {
    const { title, description, price, categories } = Object.fromEntries(formData)
    console.log(title, description, price, categories)
    const user = session.user.id
    fs.writeFile(filename, image)
    const result = await uploadImageOnCloudinary(filename, "products")
    const newProduct = await product.create({ title, description, price, category: categories, user, picture: { picture_url: result.secure_url, public_id: result.public_id } })
    return { ok: true, error: "nothing found" }
  } catch (error) {
    console.log(error)
    return { ok: false, error: error.message }
  }
  finally {
    fs.unlink(filename)
  }
}
export async function addCategory(formData) {
  await connectDB()
  const name = formData.get("name")
  const slug = createSlug(name)
  try {
    const data = await category.create({ name: name, slug: slug })
    return { ok: true, error: null }
  }
  catch (error) {
    console.log(error)
    return { ok: false, error: error.message }
  }
}
export async function getCategories() {
  await connectDB()
  const data = await category.find({}).lean()
  return data
}
export async function authenticateUser(formData) {
  // TODO: add redirection
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { ok: false, error: 'Invalid credentials.' };
        default:
          return { ok: false, error: 'Something went wrong.' };
      }
    }
    throw error;
  }
  // return { ok: !!data, error: null }
}
export async function editProduct(id, formData) {
  // TODO: add redirection
  console.log(formData)
  let filename = null
  try {
    const session = await auth()
    const user = session.user?.id
    if (!user) return
    const { title, description, price, categories, image } = Object.fromEntries(formData)
    if (!title || !description || !price || !categories || !image || !user || !id) return { ok: false, error: "Please fill all the fields" }
    await connectDB()
    const _product = await product.findById(id)
    if (!_product) return { ok: false, error: "Product Not Found" }
    if (image.name != "undefined") {
      if (_product.picture.public_url != "null" && _product.picture.public_url != null) {
        const deleteImage = await deleteImageFromCloudinary(_product.picture.public_id)
      }
      const _image = Buffer.from(await image.arrayBuffer())
      filename = Date.now() + image.name.replaceAll(" ", "_");
      fs.writeFile(filename, _image)
      const result = await uploadImageOnCloudinary(filename, "products")
      const updatedProduct = await product.findByIdAndUpdate(id, { title, description, price, category: categories, user, picture: { picture_url: result.secure_url, public_id: result.public_id } })
      revalidatePath("/admin/products")
      return { ok: true, error: null }
    }
    else {
      const updatedProduct = await product.findByIdAndUpdate(id, { title, description, price, category: categories, user })
      revalidatePath("/admin/products")
      return { ok: true, error: null }
    }
  } catch (error) {
    console.log(error)
    return { ok: false, error: error.message }
  }
  finally {
    if (filename) {
      fs.unlink(filename)
    }
  }
}
export async function createUser(formData) {
  const { name, email, password } = Object.fromEntries(formData)
  if (!name || !email || !password) return { ok: false, error: "Please fill all the fields" }
  const SALT = 10
  if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters" }
  const encryptedPassword = await bcrypt.hash(password, SALT)
  try {
    await connectDB()
    const exist = await user.findOne({ email })
    if (exist) return { ok: false, error: "User with this email already exist" }
    const _user = await user.create({ name, email, password: encryptedPassword })
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
