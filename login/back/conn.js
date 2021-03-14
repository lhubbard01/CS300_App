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
  console.log("successful connection!!");
  });
module.exports = ds
