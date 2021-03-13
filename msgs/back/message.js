const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageS = new Schema({
  username : String, 
  time     : Date,
  position : Number,
  group    : Number,
  content  : String
});




const Message = new mongoose.model("Message", MessageS);
module.exports = Message;
