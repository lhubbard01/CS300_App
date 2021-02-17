const mongo = require("mongodb").MongoClient;
const client= require("socket.io").listen(4000).sockets;
let mongoaddr = "mongodb://127.0.0.1/mongochat"
mongo.connect(mongoaddr, function(err, db){
  if (err) {
    throw err;
  }
  console.log("MongoDB connected");
















  let limit_var = 100;
  
  //connect to socket.io
  client.on("connection", function(socket){
    let chat = db.collection("chats");
    //send status handles emitting status update signal 
    sendStatus = function(s){
      socket.emit("status", s);
    }

    //get chats from mongo collection
    chat.find().limit(limit_var).sort({_id:1}).toArray(function(err, res){
      if (err){
        throw err;
      }
      //emit messages
      socket.emit("output", res);
    });

    //handle input events
    socket.on("input", function(data){
      let name = data.name;
      let msg = data.msg;
      if (name=="" || msg==""){
        sendStatus("Please enter a name and a message");
      } else{
        chat.insert({name: name, msg: msg}, function() {
          client.emit("output", [data]);

          //send status
          sendStatus({
            msg: "Message sent",
            clear: true
          });
        });
      }
    });
    
    socket.on("clear", function(data){
        chat.remove({}, function(){
          socket.emit("cleared");
      });
    });
  });
});
