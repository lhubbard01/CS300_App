const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {cors: {origin:"http://localhost:5071", credentials : true}});
const helmet = require("helmet");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.html");
});










app.use(helmet());
app.get("/api/load_msgs", (req, res) => {
  res.body = ["msg1","msg2"] 
}
);



io.on("connection", (socket) => {
  socket.on("chat message", (msg) => { 
    console.log(msg);
    message = {content: msg, time: new Date()};
    console.log("As message object"+ JSON.stringify(message));
    io.emit("chat message", message);
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


