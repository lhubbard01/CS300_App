const express = require("express");
const authRouter = express.Router();
const  mongoose = require("mongoose");
const MONGO_URI = "mongodb://testuser:testpass@localhost:27017/node-auth";
const initMongoDBServer = async() => {
  try {
    await mongoose.connect( MONGO_URI, { useNewUrlParser: true });
    alert("connected the session");
  } catch(e) { console.log(e); throw e; }
};
module.export = InitiateMongoDBServer;




/*const user = require("./data");
authRouer.route("

authRouter.use(session({
  resave: false, saveUninitialized: false, secret: "cookie"
}));
function retrieve(err, auths, hash){

authRouter.post("/auth", (req, res,next) => {
  const requestBody = {
    "method":"GET",
    "headers":{"Content-Type": "application/json"},
    "body": req
  };
  b = await fetch("/data", requestBody).then(res => res.json())

  hash({ password } , (err, pass,salt, hash) => {
    if (err) throw err;







function authentication(name, pass, cb) {
  let user = "";
  if (!user) return fn(new Error("User not found"));
  
*/
