const express = require('express');
const Product = require('../models/Product');
const multer = require("multer");
const path = require("path");
const router = express.Router();

//image upload process
const storage = multer.diskStorage({
  destination:(req,file,cb) => cb(null,"uploads/"),
  filename:(req,file,cb) => {
    const ext = path.extname(file.originalname);
    cb(null,"prod-" + Date.now() +ext);
  },
});
const fileFilter = (req,file,cb) => {
  const ok = file.mimetype.startsWith("image/");
  cb(ok ? null : new Error("only image file allowed"), ok);
};

const upload = multer({
  storage,
  fileFilter,
  limits:{fileSize: 2*1024*1024},
});


//product insert

router.post('/',upload.single("image"),async(req,res)=>{
    try {
      const {name,category,price,inStock} = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}`: "";

      const newProduct = new Product({name,category,price,inStock,imagePath});
      const product = await newProduct.save();
      res.status(201).json(product)  ;
    }
    catch(err) {
       res.status(400).json({message:"product invalid"}); 
    }
})
//view
router.get('/',async(req,res)=>{
    try {
      const products = await Product.find()
      res.json(products);
    }
    catch(err) {
       res.status(404).json({message:"product not found"}); 
    }
})

// //update
// router.put('/:id',async(req,res)=>{
//     try {
//       const {name,category,price,inStock} = req.body;
//       const productupdate = await Product.findByIdAndUpdate(
//         req.params.id,
//         {name,category,price,inStock},
//         {new:true}
//       );

//       res.status(201).json(productupdate)  ;
//     }
//     catch(err) {
//        res.status(400).json({message:"product invalid"}); 
//     }
// });
// //delete
// router.delete('/:id',async(req,res)=>{
//     try {
//       const productdelete = await Product.findByIdAndDelete(
//         req.params.id,
//       );
//       if(!productdelete) return res.status(400).json({message:"product not found"}); 
//       res.json({message:"delete done"});
//     }
    
//     catch(err) {
//        res.status(400).json({message:"product invalid"}); 
//     }
// });

module.exports = router;