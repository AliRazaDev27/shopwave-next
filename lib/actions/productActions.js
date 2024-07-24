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

const sortOptions = {
  newest: { createdAt: -1 },
  rating: { rating: -1 },
  low: { price: 1 },
  high: { price: -1 },
};

export async function getProductsByQuery(page, search, categorySlug, sort) {
  try {
    await connectDB()
    const _search = search || ""
    let _category = { _id: "" }
    if (categorySlug) {
      _category = await category.findOne({ slug: categorySlug })
    }
    let sortBy = sort || "newest"
    sortBy = sortOptions[sortBy] || sortOptions.newest;
    const _page = page || 1
    const skip = (_page - 1) * 12
    const query = { title: { $regex: _search, $options: "i" } }
    if (_category?._id) query.category = _category?._id
    const count = await product.countDocuments(query)
    const products = await product
      .find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(12)
      .populate("user")
      .populate({ path: "category", select: "name" })
      .populate({ path: "brand", select: "name" })
      .select("_id title description price rating discountPercentage thumbnail.picture_url createdAt")
      .lean()
    return { products, count }
  } catch (error) {
    console.log("Error in getProductsByQuery")
    console.log(error)
    throw new Error(error.message)
  }
}

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
  const _product = await product.findById(id).populate("category").populate("brand").populate("user").lean()
  return _product
}
export async function updateProduct(id, formData) {
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
export async function getRecommendedProducts(id) {
  try {
    await connectDB()
    const _product = await product.findById(id)
    if (!_product) throw new Error("Product not found")
    const query = {
      _id: { $ne: id },
      category: _product.category,
    };
    const recommendedProducts = await product.find(query)
      .sort({ rating: -1 }) // Sort by rating, highest first
      .limit(6); // Limit the number of recommendations
    return recommendedProducts;
  }
  catch (error) {
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
