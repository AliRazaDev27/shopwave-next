import { ObjectId } from "mongoose";
import { Brand } from "./types_brand";
import { CategoryType } from "./types_category";
import { UserType } from "./types_user";
import { ReviewType } from "./types_review";
export interface ProductType {
  _id: string;
  title?: string;
  description?: string;
  picture?: {
    picture_url?: string,
    public_id?: string,
  }
  price?: number;
  category?: ObjectId | CategoryType;
  brand?: ObjectId | Brand;
  user?: ObjectId | UserType;
  reviews?: ObjectId | ReviewType[];
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
  quantity?: number;
}
export interface ProductQueryResultType {
  products: ProductType[]
  count: number
}
