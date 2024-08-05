import { ObjectId } from "mongoose";

export interface OrderType {
    _id: ObjectId;
    user: ObjectId;
    products: {
        pricePerUnit: number
        quantity: number
        product: ObjectId
    }[];
    total: number;
    shippingInfo: {
        name: string
        address: string
        phone: string
        email: string
    };
    status: string;
    createdAt: Date;
    updatedAt: Date;
}