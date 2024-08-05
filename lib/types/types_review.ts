import { ObjectId } from "mongoose";
export interface ReviewType {
  _id: ObjectId;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
