import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";

import dotenv from "dotenv";
import dbConfig from "./Config/dbConfig.js";
// importing router variable from auth.js
import ProductRouter from "./Routes/ProductRoute.js";
import UserRouter from "./Routes/Auth.js";
import bodyParser from "body-parser";
import ProductActionRouter from "./Routes/ProductActionRoute.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:1234", // For local frontend
      "http://localhost:1235", // For local  frontend-dashboard
      process.env.FRONTEND_URL, // Deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

dbConfig.dbConnection();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// testing
app.get("/", (req, res) => {
  res.send("Testing : backing working successfully!!");
});

// user data - frontend for registration and login
app.use("/users", UserRouter);
// product add - frontend dashboard to add product
app.use("/products", ProductRouter);

// matching from slice
app.use("/product-action", ProductActionRouter);

// static --> to get access
app.use(express.static("productImages"));

const port = process.env.PORT || 1008;

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
