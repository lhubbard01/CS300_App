const mongoose =require("mongoose");
const express = require("express");
const router = express.Router();
const user = require("../data");
router.route("/create").post((req,res,next) => {
  user.create(req.body, (error, data){
    if  (error){
      return next(error);
    }
    console.log(data);
    res.json(data);

    });
});

