import { ObjectId } from "mongoose";
import { Brand } from "./types_brand";
import { Category } from "./types_category";
import { User } from "./types_user";
import { Review } from "./types_review";
export interface ProductType {
  _id: string;
  title?: string;
  description?: string;
  picture?: {
    picture_url?: string,
    public_id?: string,
  }
  price?: number;
  category?: ObjectId | Category;
  brand?: ObjectId | Brand;
  user?: ObjectId | User;
  reviews?: ObjectId | Review[];
  rating?: number;
  stock?: number;
  discountPercentage?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  thumbnail?: {
    picture_url?: string,
    public_id?: string,
  }
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ProductQueryResultType {
  products: ProductType[]
  count: number
}
