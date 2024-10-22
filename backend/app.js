import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";

import dotenv from "dotenv";
import dbConfig from "./Config/dbConfig.js";
// importing router variable from auth.js
import ProductRouter from "./Routes/ProductRoute.js";
import UserRouter from "./Routes/Auth.js";
import bodyParser from "body-parser";

const app = express();

// 3000 is react port number
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// user data - frontend for registration and login
app.use("/users", UserRouter);
// product add - frontend dashboard to add product
app.use("/products", ProductRouter);

// static --> to get access
app.use(express.static("productImages"));

dotenv.config();

dbConfig.dbConnection();

const port = process.env.PORT || 1008;

app.get("/", (req, res) => {
  res.send("get method");
});


app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});

