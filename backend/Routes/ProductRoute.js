// importing express
import express from "express";
// importing schema
import Product from "../Models/ProductModel.js";

const ProductRouter = express.Router();

// backend table name /AddProduct known as endpoint
ProductRouter.post("/AddProduct", async (req, res) => {
  console.log("Reached Add Product route");
  console.log(req.body);

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
});

export default ProductRouter;
