import express from "express";
import {
  addRecordAction,
  getAllRecords,
  removeRecordAction,
  handleQuantityAction,
} from "../controllers/ProductActionController.js";

const ProductActionRouter = express.Router();

// get records - url from slice
ProductActionRouter.get("/get-all-records/:userId", getAllRecords);
//Data of product action - wishlist
ProductActionRouter.post("/add-record-action", addRecordAction);
// delete to wishlist - wishlist
ProductActionRouter.post("/remove-record-action", removeRecordAction);
// handle quantity of product
ProductActionRouter.put("/update-quantity", handleQuantityAction);

export default ProductActionRouter;
