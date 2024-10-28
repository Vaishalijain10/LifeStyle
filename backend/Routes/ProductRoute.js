import express from "express";
import {
  AddProductController,
  fetchProductsController,
  likedProductDetails,
  ProductDetailsController,
} from "../controllers/ProductController.js";
import { uploadImage } from "../Library/Multer.js";

const ProductRouter = express.Router();

// backend table name /AddProduct known as endpoint
ProductRouter.post(
  "/AddProduct",
  uploadImage.array("files", 6),
  AddProductController
);

ProductRouter.get("/fetchProducts", fetchProductsController);

ProductRouter.get("/ProductDetails/:Product_id", ProductDetailsController);

// route for wishlist
// ProductRouter.post("/WishList", wishlistController);

ProductRouter.post("/liked-product-details", likedProductDetails);

export default ProductRouter;
