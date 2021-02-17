// template for different microservice api
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const mservice = require("./src/API");
//Set other essentials here
const ex_runtime = express();
const PORT = process.env.PORT || 7000;
ex_runtime.use(logger);

  


  // imported microservice api as mservice array ties protocol to callbacks
  //GET 
  

ex_runtime.listen(PORT, () => console.log(`Server started on port ${PORT}`));
