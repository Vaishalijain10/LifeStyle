import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoURI = process.env.MONGOOSE_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MongoURI, {});
    console.log("MongoDB Connected!!");
  } catch (err) {
    console.log(`Error in connecting to the database: ${err}`);
    console.log("error in DB Connection!");
  }
};

export default { dbConnection, MongoURI };
