import { ObjectId } from "mongoose";
export interface CategoryType {
  _id: ObjectId;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}
