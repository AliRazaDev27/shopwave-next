import { ObjectId } from "mongoose";
export interface Category {
  _id: ObjectId;
  name?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
