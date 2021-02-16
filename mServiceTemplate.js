// template for different microservice api
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

//Set other essentials here
const ex_runtime = express();
const PORT = process.env.PORT || 7000;
ex_runtime.use(logger);
ex_runtime.listen();



if (mservice[i].protocol === "get"){
  ex_runtime.get(mservice[i].loc, mservice[i].cb(req, res));
} else if (mservice[i].protocol === "post"){
  ex_runtime.post(mservice[i].loc, mservice[i].cb(req,res));
  
} else if (mservice[i].protocol === "delete"){
  ex_runtime.delete(mservice[i].loc, mservice[i].cb(req,res));
     

} else if (mservice[i].protocol === "put"){
  ex_runtime.put(mservice[i].loc, mservice[i].cb(req,res));
}
else{
  throw exception("Unknown http protocol used in express runtime routing!!!");
}
