const app = require("express")();
const http = require("http")
const httpServer = http.Server(app);

const io = require("socket.io")(httpServer, {
                                      cors: {
                                        origin : "http://localhost:5071",
                                        credentials : true
                                        }
                                      }
);

const helmet = require("helmet");

const conn         = require("./conn.js");
const MessageModel = require("./message.js");

const properties = require("./package");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.html");
});










app.use(helmet());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
  next();
});

app.get("/api/load_msgs",  function(req, res)  {
    console.log("get endpoint has been used, getting messages");

    console.log(typeof MessageModel);
    MessageModel.find( {}, (err, result) => {
      console.log("err: " + err);
      console.log("result: " + result);

      if (err){
        res.send(err);
      }

      else{
        res.header('Access-Control-Allow-Origin', '*');
        console.log(typeof result);

        res.status(200);
        console.log(res);
        res.json(result);
        console.log("returned the results");

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

    let message = {
      content: msg.message,
      time: new Date(), 
      username: "alan",
      group: 1234,
      position: msgcount
    };
    
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
    else if (buffer != 0)
      buffer -= 1;

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

async function announceSpinup(){
    
const data = JSON.stringify({
    name: "Messages",
    manifest:
      {actions:"Null"
    },
    name: "Messages",
    port: 5071
  })

const options = {
  headers: {
    "Content-Type": "application/json"
    },
  method: "POST",
  hostname: "localhost", 
  port: 5020,
  path: "/api/register"
}
  
  const req = http.request(options, res => {
    console.log("response from orchestrator : " + res.statusCode)
  })
  

  req.write(data)
  req.end()
}



httpServer.listen(5070, () => {console.log("listening at 5070")})


setTimeout(announceSpinup, 3000);
app.listen(properties.listen);
console.log("listening on " + properties.listen);
