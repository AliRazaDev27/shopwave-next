"use server"
import { connectDB } from "@/lib/db"
import user from "@/lib/models/userModel"
import { revalidatePath } from "next/cache"
import bcrypt from "bcrypt"
import { UserType } from "../types/types_user"
import { ObjectId } from "mongoose"

export async function getUsers() {
  try {
    await connectDB()
    const users: UserType[]|null = await user.find({}).lean()
    return users
  }
  catch (error:any) {
    console.log(error)
    return { ok: false, error: error.message }
  }
}
export async function updateUser(id:ObjectId, { name, email, role }:{ name: string, email: string, role: string }) {
  try {
    await connectDB()
    if (!name || !email || !role) throw new Error("Please fill all the fields")
    const _user:UserType|null = await user.findById(id)
    if (!_user) throw new Error("User not found")
    await user.findByIdAndUpdate(id, { name, email, role: role === "admin" ? 1 : 0 })
    revalidatePath("/admin/users")
    return { ok: true, error: null }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function getUser(id:ObjectId) {
  try {
    await connectDB()
    const _user:UserType|null = await user.findById(id).lean()
    if(!_user) throw new Error("User not found")
      else{
    return _user
      }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function deleteUser(id:ObjectId) {
  try {
    await connectDB()
    const _user:UserType|null = await user.findById(id)
    if (!_user) throw new Error("User not found")
    await user.findByIdAndDelete(id)
    revalidatePath("/admin/users")
    return { ok: true, error: null }
  }
  catch (error:any) {
    return { ok: false, error: error.message }
  }
}
export async function createUser(formData:FormData) {
  const { name, email, password }= Object.fromEntries(formData)
  if (!name || !email || !password) throw new Error("Please fill all the fields")
  const SALT = 10

  if ((password as string).length < 8) return { ok: false, error: "Password must be at least 8 characters" }
  const encryptedPassword = await bcrypt.hash(password as string, SALT)
  try {
    await connectDB()
    const exist = await user.findOne({ email })
    if (exist) return { ok: false, error: "User with this email already exist" }
    const _user = await user.create({ name, email, password: encryptedPassword })
    return { ok: true, error: null }
  }
  catch (error:any) { return { ok: false, error: error.message } }
}
export async function usersOverview() {
  try {
    await connectDB()
    const users:UserType[]|null = await user.find({}).lean()
    if(users === null) throw new Error("No users found")
    const total = users.length
    const newUsers = users.filter((user) => user.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
    // TODO: add method to ban a user
    const active = 0
    const inactive = 0
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const dataPastMonths = []
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
      dataPastMonths.push(count)
    }

    return { card: { total, newUsers, active, inactive }, chart: { currentMonth, dataPastMonths } }
  } catch (error:any) {
    throw new Error(error.message)
  }
}
