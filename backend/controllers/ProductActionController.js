import productAction from "../Models/ProductAction.js";

// get all records
export async function getAllRecords(req, res) {
  console.log("ProductActionController : getAllRecords");
  try {
    const records = await productAction.find({ UserId: req.params.userId });
    console.log("ProductActionController : getAllRecords : ", records);
    res.send({
      status: true,
      data: records,
    });
  } catch (error) {
    console.log("ProductActionController : getAllRecords : ", error);
    res.send({
      status: false,
      message: error.message,
    });
  }
}

// adding wishlist
export async function addRecordAction(req, res) {
  console.log("ProductActionController : addRecordAction");
  try {
    const addRecords = await productAction(req.body);
    console.log("ProductActionController : addRecordAction : ", addRecords);
    await addRecords.save();
    res.send({
      status: true,
    });
  } catch (error) {
    console.log("ProductActionController : addRecordAction : ", error);
    res.send({
      status: false,
      message: error.message,
    });
  }
}

// remove from wishlist
export async function removeRecordAction(req, res) {
  console.log("ProductActionController : removeRecordAction");
  try {
    // Find and delete the specific record for the user and product
    const removeRecords = await productAction.deleteOne({
      UserId: req.body.UserId,
      ProductId: req.body.ProductId,
      ActionType: "Like", // Ensure it is a Like action if that's the type
    });

    // Check if the product was successfully removed
    if (removeRecords.deletedCount > 0) {
      console.log("ProductActionController : Record removed successfully");
      res.send({
        status: true,
        message: "Product removed from wishlist",
      });
    } else {
      console.log("ProductActionController : No matching record found");
      res.send({
        status: false,
        message: "Product not found in wishlist",
      });
    }
  } catch (error) {
    console.log("ProductActionController : removeRecordAction : ", error);
    res.send({
      status: false,
      message: error.message,
    });
  }
}
