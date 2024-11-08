// actions -> add to cart, wishlist, buy,
// edit, delete, view from dashboard
import mongoose from "mongoose";

const productActionSchema = mongoose.Schema(
  {
    ProductId: {
      type: String,
      required: true,
    },
    UserId: {
      type: String,
      required: true,
    },
    ActionType: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const productAction = mongoose.model("Product_Action", productActionSchema);

export default productAction;
