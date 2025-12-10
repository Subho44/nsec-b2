const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

//product insert

router.post('/',async(req,res)=>{
    try {
      const {name,category,price,inStock} = req.body;
      const newProduct = new Product({name,category,price,inStock});
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