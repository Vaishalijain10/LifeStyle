import mongoose from "mongoose";

const ProductImageSchema = mongoose.Schema(
  {
    ImageUrl: {
      type: String,
      required: true,
    },
    ProductId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductImages = mongoose.model("ProductImages", ProductImageSchema);

export default ProductImages;
