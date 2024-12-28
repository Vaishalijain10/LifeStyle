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

// Product action save to db - wishlist
export async function addRecordAction(req, res) {
  console.log("ProductActionController : addRecordAction");
  try {
    const addRecord = await productAction(req.body);
    await addRecord.save();
    const productRecord = await productAction.findOne(req.body);
    console.log(productRecord);
    return res.send({
      status: true,
      data: productRecord,
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
    const removeRecords = await productAction.deleteOne(req.body);
    console.log(removeRecords);
    return res.send({
      status: removeRecords.acknowledged,
    });
  } catch (error) {
    console.log("ProductActionController : removeRecordAction : ", error);
    res.send({
      status: false,
      message: error.message,
    });
  }
}

export async function handleQuantityAction(req, res) {
  console.log(`ProductActionController : handleQuantityAction`);
  console.log(req.body);
  try {
    let record = await productAction.updateOne(
      { _id: req.body.id },
      { Quantity: req.body.Quantity }
    );
    if (!record) {
      return res.send({
        status: false,
        message: "Product action not found",
      });
    }
    console.log(record);
    if (record.modifiedCount === 1)
      return res.send({
        status: true,
      });
  } catch (error) {
    console.log("ProductActionController : handleQuantityAction : ", error);
    res.send({
      status: false,
      message: error.message,
    });
  }
}
