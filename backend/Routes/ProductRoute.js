import express from "express";
import {
  AddProductController,
  fetchProductsController,
  likedProductDetails,
  ProductDetailsController,
  getCartProductsController,
  searchProductsController,
} from "../controllers/ProductController.js";

const ProductRouter = express.Router();

ProductRouter.post("/AddProduct", AddProductController);

ProductRouter.get("/fetchProducts", fetchProductsController);

// single product detail
ProductRouter.get("/ProductDetails/:Product_id", ProductDetailsController);

ProductRouter.post("/liked-product-details", likedProductDetails);

ProductRouter.post("/get-cart-products", getCartProductsController);

ProductRouter.get("/searchProducts", searchProductsController);

export default ProductRouter;
