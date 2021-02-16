// template for different microservice api
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

//Set other essentials here
const ex_runtime = express();
const PORT = process.env.PORT || 7000;
ex_runtime.use(logger);
ex_runtime.listen();
ex_runtime.get(__dir, (req, res) => {

