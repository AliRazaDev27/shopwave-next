"use server"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import fs from "fs"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import { connectDB } from "./db"
import product from "@/lib/models/productModel"
import category from "@/lib/models/categoryModel"
import order from "@/lib/models/orderModel"
import user from "@/lib/models/userModel"
import { uploadImageOnCloudinary, deleteImageFromCloudinary } from "./cloudinaryHelper"
import { createSlug } from "./utils"
export async function addProduct(formData) {
  try {
    const session = await auth()
    const user = session?.user
    if (user?.role !== 1) throw new AuthError("Unauthorized")
    await connectDB()
    const { title, description, price, category, image } = Object.fromEntries(formData)
    console.log(formData)
    console.log(user)
    const buffer = Buffer.from(await image.arrayBuffer())
    const imageName = image.name + Date.now()
    const file = fs.writeFileSync(`public/uploads/${imageName}`, buffer)
    const picture = await uploadImageOnCloudinary(`./public/uploads/${imageName}`, "products")
    fs.unlinkSync(`./public/uploads/${imageName}`)
    const newProduct = await product.create({
      title,
      description,
      price,
      category,
      picture: {
        picture_url: picture?.secure_url,
        public_id: picture?.public_id
      },
      user: user.id
    })
    revalidatePath("/admin/products")
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
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
export async function editProduct(id, formData) {
  try {
    console.log("inside edit product")
    const session = await auth()
    const user = session?.user
    console.log(`user`, user)
    if (user?.role !== 1) throw new AuthError("Unauthorized")
    await connectDB()
    const _product = await product.findById(id)
    console.log(`formData`, formData)
    if (!_product) throw new Error("Product not found")
    const { title, description, price, category, image } = Object.fromEntries(formData)
    console.log(`name ${title} description ${description} price ${price} category ${category} picture ${image}`)
    if (image.size != 0) {
      if (_product.picture.public_id != "null") {
        await deleteImageFromCloudinary(_product.picture.public_id)
      }
      console.log("here")
      const x = Buffer.from(await image.arrayBuffer())
      console.log(`x`, x)
      const imageName = image.name + Date.now()
      fs.writeFileSync(`./public/uploads/${imageName}`, x)
      const _image = await uploadImageOnCloudinary(`./public/uploads/${imageName}`, "products")
      fs.unlink(`./public/uploads/${imageName}`, (err) => {
        if (err) console.log(err)
      })
      console.log(_image)
      const updatedProduct = await product.findByIdAndUpdate(id, { title, description, price, category, picture: { public_id: _image.public_id, picture_url: _image.secure_url } }, { new: true })
      console.log("updated")
      return { ok: true, error: null }
    }
    else {
      const updatedProduct = await product.findByIdAndUpdate(id, { title, description, price, category }, { new: true })
      console.log("updated without picture")
      return { ok: true, error: null }
    }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function authenticateUser(formData) {
  try {
    const { email, password } = Object.fromEntries(formData)
    await signIn("credentials", { email, password })
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function getCategories() {
  await connectDB()
  const data = await category.find({}).lean()
  return data
}
export async function getProductsByQuery(page, search, categorySlug, sort) {
  await connectDB()
  const _search = search || ""
  let _category = { _id: "" }
  if (categorySlug) {
    _category = await category.findOne({ slug: categorySlug })
  }
  let sortBy = sort || "newest"
  if (sortBy === "newest") sortBy = { createdAt: -1 }
  if (sortBy === "low") sortBy = { price: 1 }
  if (sortBy === "high") sortBy = { price: -1 }
  console.log(`id is ${_category?._id}`)
  const _page = page || 1
  const skip = (_page - 1) * 12
  const query = { title: { $regex: _search, $options: "i" } }
  if (_category?._id) query.category = _category?._id
  const count = await product.countDocuments(query)
  const products = await product.find(query).sort(sortBy).skip(skip).limit(12).populate("category").populate("user").lean()
  return { products, count }
}
export async function addOrder(products, formData) {
  try {
    const session = await auth()
    const user = session?.user
    if (!user) throw new AuthError("Please Login First")
    if (!products) throw new Error("Please add at least one product")
    const { name, email, address, phone } = Object.fromEntries(formData)
    if (!name || !email || !address || !phone) throw new Error("Please fill all the fields")
    await connectDB()
    let productArray = []
    for (let item of products) {
      const _product = await product.findById(item._id)
      const _item = {
        product: item._id,
        pricePerUnit: _product.price,
        quantity: item.quantity
      }
      productArray.push(_item)
    }
    const total = productArray.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0)
    console.log("total", total)
    const _order = await order.create({ user: user.id, shippingInfo: { name, address, phone, email }, total, products: productArray })
    console.log(_order)
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function getOrders() {
  await connectDB()
  const orders = await order.find({}).populate("user").lean()
  return orders
}
export async function deleteOrder(id) {
  try {
    await connectDB()
    const _order = await order.findById(id)
    if (!_order) throw new Error("Order not found")
    await order.findByIdAndDelete(id)
    revalidatePath("/admin/orders")
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function getOrder(id) {
  try {
    await connectDB()
    const _order = await order.findById(id).populate("user").populate("products.product").lean()
    // console.log(_order)
    return JSON.stringify(_order)
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function updateOrder(id, status) {
  try {
    await connectDB()
    const _order = await order.findById(id)
    if (!_order) throw new Error("Order not found")
    const OrderStates = ["pending", "processing", "shipped", "delivered", "cancelled", "returned", "failed", "refunded", "completed"]
    if (!OrderStates.includes(status)) throw new Error("Invalid status")
    if (_order.status === status) throw new Error("Order already in that state")
    _order.status = status
    await _order.save()
    revalidatePath("/admin/orders")
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }

}

