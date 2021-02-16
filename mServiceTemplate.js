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
  if (mservice[i].protocol === "get"){
    ex_runtime.get(mservice[i].loc, mservice[i].cb(req, res));
  }
  // POST
  else if (mservice[i].protocol === "post"){
    ex_runtime.post(mservice[i].loc, mservice[i].cb(req,res));
  }
  // PUT
  else if (mservice[i].protocol === "put"){
    ex_runtime.put(mservice[i].loc, mservice[i].cb(req,res));
  }
  // DELETE 
  else if (mservice[i].protocol === "delete"){
    ex_runtime.delete(mservice[i].loc, mservice[i].cb(req,res));
  }
  
  // If unknown protocol passed in, protocol as string logged.
  else{
    throw "Unknown http protocol " + mservice[i].protocol + " passed to express routing!!!"
  }

  

ex_runtime.listen(PORT, () => console.log(`Server started on port ${PORT}`));
