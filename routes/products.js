const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

router.get('/', (req, res, next) => {
    Product.find().then((products) => {
        res.json(products);
      }).catch((err) => {
        next(err);
      });
      
});

//insert
router.post('/', (req, res, next) => {
    Product.create(req.body)
      .then((post) => { 
        res.json(post);
      })
      .catch((err) => {
        next(err);
      });
});

//get single
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
      .then((post) => {
        if (!post) {
          const err = new Error('Document not found');
          err.status = 404;
          throw err;
        }
        res.json(post);
      })
      .catch((err) => {
        next(err);
      });
  });

//update
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { new: true })
      .then((post) => {
        if (!post) {
          const err = new Error('Document not found');
          err.status = 404;
          throw err;
        }
        res.json(post);
    })
    .catch((err) => {
        next(err);
    });
});


router.delete('/:id',(req,res,next)=>{
    const id = req.params.id ; 

    Product.findByIdAndDelete(id)
        .then((post)=>{
            if (!post) {
                console.log(err);
            }
            res.json(post);
        })
        .catch((err)=>{
            next(err);
        })
} )
  

module.exports = router ;