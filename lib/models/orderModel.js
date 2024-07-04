import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderItems: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    }
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  status: { type: String, default: "Pending" },
}, {
  timestamps: true
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order

