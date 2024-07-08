import product from "@/lib/models/productModel"
import category from "@/lib/models/categoryModel"
import { uploadImageFromURL } from "@/lib/cloudinaryHelper"
import { createSlug } from "@/lib/utils"
import { connectDB } from "@/lib/db"
export async function GET() {
  await connectDB()
  const _products = await fetch("https://dummyjson.com/products?limit=0")
  const products = (await _products.json()).products
  for (let product of products) {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      tags,
      brand,
      images,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      reviews,
    } = product
    const categorySlug = createSlug(category)
    const categoryExist = await category.findOne({ slug: categorySlug })
    let categoryId = categoryExist?._id
    if (!categoryExist) {
      const newCategory = await category.create({
        name: category,
        slug: categorySlug
      })
      categoryId = newCategory._id
    }
    const { public_id, secure_url } = await uploadImageFromURL(images[0])
    await product.create({
      title,
      description,
      category: categoryId,
      price,
      discountPercentage,
      rating,
      stock,
      tags,
      brand,
      picture: { public_id, secure_url },
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
    })
  }

}
