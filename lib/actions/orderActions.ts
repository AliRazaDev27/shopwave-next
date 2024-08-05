"use server"
import { connectDB } from "@/lib/db"
import order from "@/lib/models/orderModel"
import product from "@/lib/models/productModel"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { AuthError } from "next-auth"
import { ObjectId } from "mongoose"
import { OrderType } from "../types/types_orders"
import { ProductType } from "../types/types_product"
import { string } from "zod"

export async function addOrder(products: ProductType[], formData: FormData) {
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
      const _item:any = {
        product: item._id,
        pricePerUnit: _product.price,
      }
      if(item.quantity){
        _item.quantity = item.quantity
      }
      productArray.push(_item)
    }
    const total = productArray.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0)
    const _order = await order.create({ user: user.id, shippingInfo: { name, address, phone, email }, total, products: productArray })
    revalidatePath("/cart")
    return { ok: true, error: null }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function getOrders() {
  await connectDB()
  const orders = await order.find({}).populate("user").lean()
  return orders
}
export async function deleteOrder(id: ObjectId) {
  try {
    await connectDB()
    const _order = await order.findById(id)
    if (!_order) throw new Error("Order not found")
    await order.findByIdAndDelete(id)
    revalidatePath("/admin/orders")
    return { ok: true, error: null }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function getOrder(id:ObjectId) {
  try {
    await connectDB()
    const _order:OrderType|null = await order.findById(id).populate("user").populate("products.product").lean()
    if (_order === null) throw new Error("Order not found")
    return JSON.stringify(_order)
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function updateOrder(id:ObjectId, status:string) {
  try {
    await connectDB()
    const _order = await order.findById(id)
    if (!id) throw new Error("Order not found")
    if (!_order) throw new Error("Order not found")
    const OrderStates = ["pending", "processing", "shipped", "delivered", "cancelled", "returned", "failed", "refunded", "completed"]
    if (!OrderStates.includes(status)) throw new Error("Invalid status")
    if (_order.status === status) throw new Error("Order already in that state")
    _order.status = status
    await _order.save()
    revalidatePath("/admin/orders")
    return { ok: true, error: null }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function ordersOverview() {
  try {
    await connectDB()
    const orders:OrderType[]|null = await order.find().select("_id status createdAt").lean()
    if (!orders) throw new Error("No orders found")
    const total = orders.length
    const pending = orders.filter((order) => order.status === "pending").length
    const cancelled = orders.filter((order) => order.status === "cancelled").length
    const completed = orders.filter((order) => order.status === "completed").length
    const now = new Date();
    const monthCounts = Array(6).fill(0);
    orders.forEach(order => {
      const createdAt = new Date(order.createdAt);
      const monthsDiff = (now.getFullYear() - createdAt.getFullYear()) * 12 + (now.getMonth() - createdAt.getMonth());
      if (monthsDiff >= 0 && monthsDiff < 6) {
        monthCounts[monthsDiff]++;
      }
    });
    return { card: { total, pending, cancelled, completed }, chart: { monthCounts, currentMonth: now.getMonth() } }
  }
  catch (error:any) {
    throw new Error(error.message)
  }
}
