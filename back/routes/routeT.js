const express = require("express");
const hello_router = express.Router();


hello_router.get("/", (req, res) =>{
  res.send("Hello even further and more");
});

hello_router.post("/", (req, res) => {
  res.send("posting is happening its postage");
});


 module.exports = hello_router;
