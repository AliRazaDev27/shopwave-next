"use server"
import { signIn } from "@/auth"
import * as userActions from "@/lib/actions/userActions"
import * as categoryActions from "@/lib/actions/categoryActions"
import * as orderActions from "@/lib/actions/orderActions"
import * as productActions from "@/lib/actions/productActions"

// export { userActions, categoryActions, orderActions, productActions }
export const { createUser, getUser, getUsers, updateUser, deleteUser } = userActions
export const { deleteCategory, createCategory, getCategories, updateCategory } = categoryActions
export const { addOrder, getOrder, getOrders, updateOrder, deleteOrder } = orderActions
export const { addProduct, getProduct, getProducts, getProductsByQuery, updateProduct, deleteProduct } = productActions

export async function authenticateUser(formData) {
  const { email, password } = Object.fromEntries(formData)
  await signIn("credentials", { email, password })
}

