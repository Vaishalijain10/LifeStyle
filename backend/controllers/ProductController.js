import Product from "../Models/ProductModel.js";

//Add Product
export async function AddProductController(req, res){
    console.log("Reached Add Product route");
    console.log(req.body.ProductId);
    console.log(req.files);

    let ImgArray = [];
    Array.from(req.files).forEach((element) => {
      ImgArray.push(element.originalname);
    });

    // backend to route
    req.body.images = ImgArray;
    console.log(req.body);

    try {
      const newProduct = await Product(req.body);
      newProduct.save();
      console.log("Product added successfully.");

      // creating object and send it to the frontend
      return res.send({
        status: true,
        message: "Product added successfully.",
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        message: "Something went wrong in the database.",
      });
    }
}
//fetch Products
export async function fetchProductsController(req, res){
    console.log("fetching product");
    // retrieving images from the folder -> ./productImages and file name is same as saved in the backend in the form of array
  
    try {
      // where clause -> SQL AND mongo -> pass object
      const details = await Product.find({ Admin: "Vaishali" });
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
export async function ProductDetailsController(req, res){
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
}
// WishList
export async function wishlistController(req, res){
    console.log("Reached at WishList");
    // Extract productIds from the request body (assuming the frontend sends them this way)
    const { productIds } = req.body;
    if (!productIds || productIds.length === 0) {
      return res.status(400).send({
        status: false,
        message: "No product IDs provided.",
      });
    }
    try {
      // Use the product IDs to fetch product details from the database
      const wishlistProducts = await Product.find({ _id: { $in: productIds } });
  
      if (wishlistProducts.length === 0) {
        return res.status(404).send({
          status: false,
          message: "No products found for the provided IDs.",
        });
      }
      console.log("Fetched wishlist products:", wishlistProducts);
      // Return the product details to the frontend
      return res.send({
        status: true,
        data: wishlistProducts,
      });
    } catch (error) {
      console.log("Error fetching wishlist products:", error);
      return res.status(500).send({
        status: false,
        message: "Database connectivity issue!",
      });
    }
}