import { ObjectId } from "mongoose";
export interface Brand {
  _id: ObjectId;
  name?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
