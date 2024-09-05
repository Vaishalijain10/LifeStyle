import mongoose from "mongoose";
// Category
// images ->
// name ->
// ratings ->
// Price ->
// discount if available
// Net Quantity
// Material type
// size
// Country of Origin
// About the item
const ProductSchema = mongoose.Schema({
  ProductCategory: {
    type: String,
    required: true,
  },
  ProductId: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  StockAvailable: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Discount: {
    type: Number,
  },
  NetQuantity: {
    type: Number,
    required: true,
  },
  MaterialType: {
    type: String,
    required: true,
  },
  SizeOfProduct: {
    type: Number,
  },
  CountryOfOrigin: {
    type: String,
    required: true,
  },
  AboutItem: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("ProductForm", ProductSchema);

export default Product;

// images: [
//     {
//       URL: String,
//       filename: String,
//     },
//   ],
