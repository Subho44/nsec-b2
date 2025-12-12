const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ✅ ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "prod-" + Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const ok = file.mimetype.startsWith("image/");
  cb(ok ? null : new Error("only image file allowed"), ok);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// ✅ product insert
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, inStock } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    // ✅ FIXED: save into `image`, not `imagePath`
    const newProduct = new Product({
      name,
      category,
      price: Number(price),
      inStock: inStock === "true" || inStock === true,
      image: imagePath,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "product invalid", error: err.message });
  }
});

// view
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(404).json({ message: "product not found" });
  }
});

module.exports = router;
