"use server"
import { connectDB } from "@/lib/db"
import user from "@/lib/models/userModel"
import { revalidatePath } from "next/cache"
import bcrypt from "bcrypt"

export async function getUsers() {
  try {
    await connectDB()
    const users = await user.find({}).lean()
    return users
  }
  catch (error) {
    console.log(error)
    return { ok: false, error: error.message }
  }
}
export async function updateUser(id, { name, email, role }) {
  try {
    await connectDB()
    if (!name || !email || !role) throw new Error("Please fill all the fields")
    const _user = await user.findById(id)
    if (!_user) throw new Error("User not found")
    await user.findByIdAndUpdate(id, { name, email, role: role === "admin" ? 1 : 0 })
    revalidatePath("/admin/users")
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function getUser(id) {
  try {
    await connectDB()
    const _user = await user.findById(id).lean()
    return _user
  }
  catch (error) {
    return { ok: false, error: error.message }
  }
}
export async function deleteUser(id) {
  try {
    await connectDB()
    const _user = await user.findById(id)
    if (!_user) throw new Error("User not found")
    await user.findByIdAndDelete(id)
    revalidatePath("/admin/users")
    return { ok: true, error: null }
  }
  catch (error) {
    return { ok: false, error: error.message }
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
  catch (error) { return { ok: false, error: error.message } }
}
export async function usersOverview() {
  try {
    await connectDB()
    const users = await user.find({}).lean()
    const total = users.length
    const newUsers = users.filter((user) => user.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
    // TODO: add method to ban a user
    const active = 0
    const inactive = 0
    const currentDate = new Date()
    console.log(`currentDate`, currentDate)
    const currentMonth = currentDate.getMonth()
    const usersPastMonths = []
    for (let i = 1; i <= 6; i++) {
      const count = users.filter(
        (user) => {
          const userDate = new Date(user.createdAt)
          const isSmaller = new Date(new Date().setMonth(currentDate.getMonth() - (i - 1)))
          if (userDate < isSmaller) {
            return true
          }
          return false
        }
      ).length
      usersPastMonths.push(count)
    }

    return { card: { total, newUsers, active, inactive }, chart: { currentMonth, usersPastMonths } }
  } catch (error) {
    throw new Error(error.message)
  }
}
