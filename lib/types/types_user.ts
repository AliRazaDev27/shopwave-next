import { ObjectId } from "mongoose";
export interface UserType {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}
