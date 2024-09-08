// importing express
import express, { response } from "express";
// importing schema
import Product from "../Models/ProductModel.js";
// used to upload images in the 3rd party application "multer" -> it is an api used to help to store image in the backend.
import multer from "multer";

const ProductRouter = express.Router();

// multer -
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, "./ProductImages");
  },
  filename: function (req, file, callback) {
    return callback(null, `${req.body.ProductId}-${file.originalname}`);
  },
});

// schema type -> passing as an object -> multer syntax
const uploadImage = multer({ Storage });

// backend table name /AddProduct known as endpoint
ProductRouter.post(
  "/AddProduct",
  uploadImage.array("files", 6),
  async (req, res) => {
    console.log("Reached Add Product route");
    console.log(req.body.ProductId);
    console.log(req.files);
    try {
      const ProductAlreadyExist = await Product.findOne({
        ProductId: req.body.ProductId,
      });

      if (ProductAlreadyExist === null) {
        const newProduct = await Product(req.body);
        newProduct.save();
        console.log("Product added successfully.");

        // creating object and send it to the frontend
        return res.send({
          success: true,
          message: "Product added successfully.",
        });
      }

      // if Product already exist than below code will work!
      console.log("Product Id already exists!");
      return res.send({ success: false, message: "ProductId already exists!" });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Something went wrong in the database.",
      });
    }
  }
);

ProductRouter.get("/fetchProducts", async (req, res) => {
  console.log("fetching product");

  try {
    const details = await Product.find();
    if (details == null) {
      console.log("null product details");
      return res.send({ status: false, message: "Product DataBase is empty" });
    } else {
      console.log("fetched product details");
      return res.send({ status: true, data: details });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: error.message });
  }
});

ProductRouter.get("/ProductDetails/:Product_id", async (req, res) => {
  console.log("Fetching single product");
  console.log(req.params);

  try {
    //calling model
    console.log("Single product id :", req.params.Product_id);
    const detailsOfSingleProduct = await Product.findOne({
      _id: req.params.Product_id,
    });

    if (detailsOfSingleProduct != null) {
      return res.send({ status: true, data: detailsOfSingleProduct });
    } else {
      return res.send({ status: false, message: "Invalid URL" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: "Database connectivity issue!" });
  }
});

export default ProductRouter;
