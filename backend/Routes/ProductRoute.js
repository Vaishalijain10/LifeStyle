import express from "express";
import {
  AddProductController,
  fetchProductsController,
  ProductDetailsController,
  wishlistController,
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
ProductRouter.post("/WishList", wishlistController);

export default ProductRouter;
