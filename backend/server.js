import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { Product } from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json()); // Allows use to accept JSON data in request body

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on http://localhost:5000...");
});

// Add a product
app.get("/products", (req, res) => {
  console.log("GET /products called");
  res.send("WORKING");
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    res.status(400).json({ message: "Please submit all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
