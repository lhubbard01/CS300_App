const mongoose = require("mongoose")
const Schema = mongoose.Schema;



const DMessageScehma = new Schema({
  username: {
    type: String,
    required: true
  },

  datetime: {
    type: Date,
    default: Date.now
  },

  src: {
    type: String,
    required: true
  },
  
  pmsg_id: {
    type: id,
    required: true
  },

  src_username: {
    type: String,
    required: true
  },

  dest: {
    type: String,
    required: true
  },
  
  is_aggregate: {
    type: Bool,
    required: true
  },

  content: {
    type: String,
    required: true
  }
});

module.exports = DMessage = mongoose.model("dmessage", DMessageSchema);
