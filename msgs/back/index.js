const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {cors: {origin:"http://localhost:5071", credentials : true}});
const helmet = require("helmet");

const conn = require("./conn.js");
const MessageModel = require("./message.js");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.html");
});










app.use(helmet());
app.get("/api/load_msgs", (req, res) => {
    
    MessageModel.find( {}, (err, result) => {
      if (err){
        res.send(err);
      }
      else{
        res.send(result);
      }
    });
  }
);


class sessionPersister{
  constructor(){
    this.msgcount = 0;
    this.inc = this.inc.bind(this);
  };
  inc(){
    this.msgcount += 1;
    return this.msgcount;
  }
};
var session = new sessionPersister();

io.on("connection", (socket) => {
  console.log("new session");
  socket.on("chat message", (msg) => { 
    let msgcount = session.inc();
    console.log(msg);
    let message = {content: msg.message, time: new Date(), username: "alan", group: 1234, position: msgcount};
    console.log("As message object"+ JSON.stringify(message));
    socket.broadcast.emit("chat message", message);
    let msgDoc = new MessageModel(message);
    console.log("message model docuent created");
    msgDoc.save();
    console.log("successful push to remote instance")
  });
  let messagebool = false;
  let buffer = 0;
  socket.on("user typing", (e) => {
    console.log("after");
    console.log(JSON.stringify(e))
    if (e.add) 
      buffer += 1;
    else{
      if (buffer != 0)
        buffer -= 1;
    }
    console.log(buffer);
    if (buffer === 0){
      console.log("emit clear typing");
      io.emit("clear typing");
      messagebool = true;
    }
    console.log("user typing");
    if (! messagebool){
      messagebool = true;
      io.emit("user typing");
    }

  });
  socket.on("submit msg", (e) => {
    messagebool = false;
    console.log("message received");
    console.log(JSON.stringify(e));
    console.log(e.message);
    io.emit("submit msg");
    buffer = 0;
  

  });


  socket.on("clear typing", () => {
    io.emit("clear typing");
  });
});
http.listen(5070, () => {
              console.log("listening at 5070");});






http.on("disconnect", () => {
  console.log("user disconnected");
});


