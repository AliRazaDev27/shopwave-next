import { connectDB } from "@/lib/db"
import category from "@/lib/models/categoryModel"
export async function GET() {
  await connectDB()
  const categories = await category.find({}).lean()
  return Response.json(categories)
}
