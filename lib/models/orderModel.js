import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // products: [
  //   {
  //     pricePerUnit: { type: Number, required: true },
  //     quantity: { type: Number, required: true },
  //     product: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product",
  //       required: true
  //     }
  //   }
  // ],
  products: { type: mongoose.Schema.Types.Mixed, required: true },
  total: { type: Number, required: true },
  shippingInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  status: { type: String, default: "Pending" },
}, {
  timestamps: true
})

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order

