// different data models and schema
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const RemoteMongoEndpoint = "mongodb+srv://user1:abcd123@cluster0.tvvl6.mongodb.net/Datastore1?retryWrites=true&w=majority"

mongoose.connect(RemoteMongoEndpoint, {
  useNewUrlParser    : true, 
  useUnifiedTopology : true}
);

const ds = mongoose.connection

ds.on("error",console.error.bind(console, "connection failure to remote mongo instance"));


ds.once("open",
  function(){
    






    const UserSchema = new Schema({
      "name"     : String, 
      "password" : String, 
      "username" : String, 
      "email"    : String
    });

    const UserModel = mongoose.model("User", UserSchema);
    //note this is actually a document
    const userDoc = UserModel({name: "User Name", password: "password", username: "username123", emaill: "username@gmail.com"})
  


  console.log("successful connection!!");
  
  });
module.exports = ds;
