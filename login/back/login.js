const mongoose = require("mongoose");
const Schema = mongoose.Schema;

LoginSchema = new Schema({
  "username" : String,
  "password" : String,
  "email"    : String,
  "created"  : Date
  });
const LoginModel = mongoose.model("LoginModel", LoginSchema);
module.exports = LoginModel;
