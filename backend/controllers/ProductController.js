import Product from "../Models/ProductModel.js";
// import ProductImages from "../Models/ProductImageModel.js";
import { upload } from "../Library/Multer.js";

//Add Product
export async function AddProductController(req, res) {
  console.log("Reached Add Product controller");
  // Manually invoke multer's file upload handler
  const multerUpload = upload.single("profilePhoto");
  multerUpload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err.message);
    }

    console.log("Request Body:", req.body);

    try {
      // Save product details
      const newProduct = new Product(req.body);
      await newProduct.save();

      console.log("Product added successfully.");
      res.send({ status: true, message: "Product added successfully." });
    } catch (error) {
      console.error("Error adding product:", error);
      res.send({
        status: false,
        message: "Something went wrong in the database.",
      });
    }
  });
}

//fetch Products
export async function fetchProductsController(req, res) {
  console.log("fetching product");
  // retrieving images from the folder -> ./productImages and file name is same as saved in the backend in the form of array

  try {
    // where clause -> SQL AND mongo -> pass object
    const details = await Product.find({ Admin: "Vaishali" });
    // const imagesDetails = await ProductImages.find();
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
}

// ProductDetails
export async function ProductDetailsController(req, res) {
  console.log("Fetching single product");
  console.log(req.params);
  try {
    //calling model
    console.log("Single product id :", req.params.Product_id);
    const detailsOfSingleProduct = await Product.findOne({
      _id: req.params.Product_id,
    });
    // const detailsOfSingleProductImage = await ProductImages.findOne({
    //   ProductId: detailsOfSingleProduct.ProductId,
    // });

    console.log(detailsOfSingleProduct);
    if (detailsOfSingleProduct != null) {
      return res.send({
        status: true,
        data: detailsOfSingleProduct,
        // ImageData: detailsOfSingleProductImage.ImageUrl,
      });
    } else {
      return res.send({ status: false, message: "Invalid URL" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: "Database connectivity issue!" });
  }
}

// wishlist
export async function likedProductDetails(req, res) {
  console.log("liked Product Details");
  console.log(req.body);
  try {
    const likedProductIds = req.body;
    const likedProducts = await Product.find({
      ProductId: { $in: likedProductIds },
    });
    // const imagesDetails = await ProductImages.find();

    res.send({ status: true, data: likedProducts });
  } catch (error) {
    console.log(error);
    return res.send({ status: false, message: "Database connectivity issue!" });
  }
}
// add to cart
export async function getCartProductsController(req, res) {
  console.log("ProductRoute : GetCartProductsController");
  console.log(req.body);

  const ids = Array.from(req.body).map((product) => product.ProductId);
  try {
    const response = await Product.find({ ProductId: { $in: ids } });
    let CartProducts = [];
    // console.log(response);
    CartProducts = response.map((product) => {
      var instan = { ...product }._doc;
      instan.Quantity =
        req.body[
          Array.from(req.body).findIndex(
            (ele) => ele.ProductId === product.ProductId
          )
        ].Quantity;

      return instan;
    });
    console.log("THE PROROR");
    CartProducts.forEach((product) => console.log(product));
    return res.send({
      status: true,
      data: CartProducts,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: error.message,
    });
  }
}

// Search Products
export async function searchProductsController(req, res) {
  console.log("Searching products...");
  const searchQuery = req.query.q; // Get search query from the URL query parameter
  console.log(searchQuery);
  try {
    const products = await Product.find({
      Admin: "Vaishali",
      Name: { $regex: searchQuery, $options: "i" },
    }).sort({ name: 1 });
    console.log(products);
    if (products.length === 0) {
      return res.send({ status: false, message: "No products found." });
    }

    return res.send({ status: true, data: products });
  } catch (error) {
    console.log("Error while searching products:", error);
    return res.send({ status: false, message: error.message });
  }
}
