"use server"
import { connectDB } from "@/lib/db"
import product from "@/lib/models/productModel"
import category from "@/lib/models/categoryModel"
import brand from "@/lib/models/brandModel"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { AuthError } from "next-auth"
import { uploadImageOnCloudinary, deleteImageFromCloudinary } from "@/lib/cloudinaryHelper"
import fs from "fs"
import { ProductType, ProductQueryResultType } from "@/lib/types/types_product"
import mongoose, { ObjectId } from "mongoose"
import { User } from "@/lib/types/types_user"

interface SortOptions {
  newest: { createdAt: -1 },
  rating: { rating: -1 },
  low: { price: 1 },
  high: { price: -1 },
  [key: string]: any
};

interface QueryOptions {
  title: any,
  [key: string]: any
}
export async function getProductsByQuery(page: number, search: string, categorySlug: string, sort: string) {
  try {
    await connectDB()
    const _search = search || ""
    let _category = { _id: "" }
    if (categorySlug) {
      const categoryID = await category.findOne({ slug: categorySlug }).select("_id")
      if (!categoryID) throw new Error("Category not found")
      _category = categoryID
    }
    let sortBy: any = sort || "newest"
    const sortOptions: SortOptions = {
      newest: { createdAt: -1 },
      rating: { rating: -1 },
      low: { price: 1 },
      high: { price: -1 },
    }
    // sortBy = sortOptions[sortBy as keyof typeof sortOptions] || sortOptions.newest;
    sortBy = sortOptions[sortBy] || sortOptions.newest
    const _page = page || 1
    const skip = (_page - 1) * 12
    const query: QueryOptions = { title: { $regex: _search, $options: "i" } }
    if (_category?._id) query.category = _category?._id
    const count = await product.countDocuments(query)
    console.log("fine until now")
    const products: ProductType[] = await product
      .find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(12)
      .populate("user")
      .populate({ path: "category", select: "name" })
      .populate({ path: "brand", select: "name" })
      .select("_id title description price rating discountPercentage thumbnail.picture_url createdAt")
      .lean()
    const result: ProductQueryResultType = { products, count }
    // return { products, count }
    return result
  } catch (error: any) {
    console.log("Error in getProductsByQuery")
    console.log(error)
    throw new Error(error?.message || "Error in getProductsByQuery")
  }
}

export async function addProduct(formData: FormData) {
  try {
    const session = await auth()
    const user: any = session?.user
    if (user && user?.role !== 1) throw new AuthError("Unauthorized")
    await connectDB()
    const {
      title,
      description,
      price,
      category,
      image,
      stock,
      discount,
      warranty,
      shipping,
    }
      = Object.fromEntries(formData)
    if (!title || !description || !price || !category || !image || !stock || !discount || !warranty || !shipping) throw new Error("All fields are required")
    if(image instanceof File){
const buffer = Buffer.from(await image.arrayBuffer())
    const imageName = image.name + Date.now()
    const file = fs.writeFileSync(`public/uploads/${imageName}`, buffer)
    // TODO: Add thumbnail generation.
    const picture = await uploadImageOnCloudinary(`./public/uploads/${imageName}`, "products")
    fs.unlinkSync(`./public/uploads/${imageName}`)
    await product.create({
      title,
      description,
      price,
      category,
      stock,
      discount,
      warranty,
      shipping,
      brand: null,
      picture: {
        picture_url: picture?.secure_url,
        public_id: picture?.public_id
      },
      thumbnail: {
        picture_url: picture?.secure_url,
        public_id: picture?.public_id
      },
      user: user.id
    })
    revalidatePath("/admin/products")
    return { ok: true, error: null }
    }
    else{
      throw new Error("Image not found")
    }
  }
  catch (error: any) {
    return { ok: false, error: error.message }
  }
}
export async function getProducts() {
  await connectDB()
  const data: ProductType[] = await product.find({}).populate("category").populate("user").sort({ createdAt: -1 }).lean()
  return data
}
export async function deleteProduct(id: mongoose.Types.ObjectId) {
  try {
    const session = await auth()
    const user:any = session?.user
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
  } catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function getProduct(id: mongoose.Types.ObjectId) {
  try{
    await connectDB()
  const _product: ProductType|null = await product.findById(id).populate("category").populate("brand").populate("user").lean()
  if(_product == null) throw new Error("Product not found")
    else{
  return _product  
  }
  }
  catch(error:any){
    return { ok: false, error: error.message }
  }
}
export async function updateProduct(id: mongoose.Types.ObjectId, formData: FormData) {
  try {
    const session = await auth()
    const user:any = session?.user
    if (user?.role !== 1) throw new AuthError("Unauthorized")
    await connectDB()
    const _product = await product.findById(id)
    if (!_product) throw new Error("Product not found")
    const { title, description, price, category, image } = Object.fromEntries(formData)
    if(image instanceof File){
        if (image.size != 0) {
      if (_product.picture.public_id != "null") {
        await deleteImageFromCloudinary(_product.picture.public_id)
      }
      const imageBuffer = Buffer.from(await image.arrayBuffer())
      const imageName = image.name + Date.now()
      fs.writeFileSync(`./public/uploads/${imageName}`, imageBuffer)
      const _image = await uploadImageOnCloudinary(`./public/uploads/${imageName}`, "products")
      fs.unlink(`./public/uploads/${imageName}`, (err) => {
        if (err) console.log(err)
      })
      await product.findByIdAndUpdate(id, { title, description, price, category, picture: { public_id: _image.public_id, picture_url: _image.secure_url } }, { new: true })
      return { ok: true, error: null }
    }
    else {
      await product.findByIdAndUpdate(id, { title, description, price, category }, { new: true })
      return { ok: true, error: null }
    }
    }
  
  } catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function getRecommendedProducts(id: mongoose.Types.ObjectId) {
  try {
    await connectDB()
    const _product = await product.findById(id)
    if (!_product) throw new Error("Product not found")
    const query = {
      _id: { $ne: id },
      category: _product.category,
    };
    const recommendedProducts: ProductType[] = await product.find(query)
      .sort({ rating: -1 }) // Sort by rating, highest first
      .limit(6).lean(); // Limit the number of recommendations
    return recommendedProducts;
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function productsOverview() {
  await connectDB()
  const data = await product.find().select("_id stock createdAt").lean()
  const total = data.length
  const active = data.filter((product) => product.stock > 0).length
  const inactive = total - active
  const newProducts = data.filter((product) => new Date(product.createdAt).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000).length
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const dataPastMonths = []
  for (let i = 1; i <= 6; i++) {
    const count = data.filter(
      (item) => {
        const productDate = new Date(item.createdAt)
        const isSmaller = new Date(new Date().setMonth(currentDate.getMonth() - (i - 1)))
        if (productDate < isSmaller) {
          return true
        }
        return false
      }
    ).length
    dataPastMonths.push(count)
  }
  return { card: { total, active, inactive, newProducts }, chart: { currentMonth, dataPastMonths } }
}