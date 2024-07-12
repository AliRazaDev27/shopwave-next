import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { connectDB } from "./lib/db.js"
import { createSlug } from "./lib/utils.js"
import { uploadImageFromUrl } from "./lib/cloudinaryHelper.js"

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
}, { timestamps: true })
const categoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema)

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
}, { timestamps: true })
const brandModel = mongoose.models.Brand || mongoose.model('Brand', brandSchema)

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true })
const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema)

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    picture_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  thumbnail: {
    picture_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true
  },
  warrantyInformation: {
    type: String,
    default: "No warranty"
  },
  shippingInformation: {
    type: String,
    default: "shipping in 7 business days"
  },

}, { timestamps: true })
const productModel = mongoose.models.Product || mongoose.model('Product', productSchema)

async function seed() {
  await connectDB()
  const data = await fetch('https://dummyjson.com/products?limit=0')
  const info = await data.json()
  const products = info.products
  for (let product of products) {
    let categoryID = null
    let brandID = null
    let reviewsID = []
    let picture = null
    let _thumbnail = null
    let index = 1
    const { category, brand, reviews, images, thumbnail } = product
    console.log(category, brand)
    if (category) {
      const slug = createSlug(category)
      const exist = await categoryModel.findOne({ slug })
      if (exist) categoryID = exist._id
      else {
        const newCategory = await categoryModel.create({ name: category, slug })
        categoryID = newCategory._id
      }
    }
    if (brand) {
      const slug = createSlug(brand)
      const exist = await brandModel.findOne({ slug })
      if (exist) brandID = exist._id
      else {
        const newBrand = await brandModel.create({ name: brand, slug })
        brandID = newBrand._id
      }
    }
    if (reviews) {
      for (let review of reviews) {
        const { reviewerName, reviewerEmail, rating, comment } = review
        const newReview = await reviewModel.create({ name: reviewerName, email: reviewerEmail, rating, comment })
        reviewsID.push(newReview._id)
      }
    }

    if (images) {
      const { public_id, secure_url } = await uploadImageFromUrl(images[0], "products")
      picture = { picture_url: secure_url, public_id }
    }
    if (thumbnail) {
      const { public_id, secure_url } = await uploadImageFromUrl(thumbnail)
      _thumbnail = { picture_url: secure_url, public_id }
    }

    const newProduct = await productModel.create(
      {
        title: product.title,
        description: product.description,
        picture,
        price: product.price,
        category: categoryID,
        brand: brandID,
        reviews: reviewsID,
        thumbnail: _thumbnail,
        rating: product.rating,
        category: categoryID,
        brand: brandID,
        user: "6690aec948bdd87c8b37cc37",
        stock: product.stock,
        discountPercentage: product.discountPercentage,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation
      })
    console.log(index)
    index += 1
  }
}
seed()






















