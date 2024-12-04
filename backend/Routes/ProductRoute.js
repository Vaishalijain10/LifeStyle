import express from "express";
import {
  AddProductController,
  fetchProductsController,
  likedProductDetails,
  ProductDetailsController,
  getCartProductsController,
  searchProductsController
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

ProductRouter.post("/liked-product-details", likedProductDetails);

ProductRouter.post("/get-cart-products", getCartProductsController);

ProductRouter.get("/searchProducts",searchProductsController)


export default ProductRouter;
