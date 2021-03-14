const express = require("express");
const https = require("http");
console.log("loaded modules");
const Agent = https.Agent;
console.log("agent declared");
//Declared routes and Routers
//const PINGRouter = require("./back/routes/PINGRouter");
const app = express();
console.log("app instantiated");
//app.use(PINGRouter);

//networking definitions and startup
const orchestratorPort = 5020;
const listen_port = process.env.PORT || 5034;
console.log("ports orchestrator and listen declared");















const data = JSON.stringify({
    name: 'Ping',
    port: listen_port,
    manifest:
      {actions:
      {getHealth:{
        args:["serviceName"],
        port: listen_port,
        host: "localhost",
        path: "/api/getHealth",
        method: "POST"
      },
      port: listen_port,
      name: "Ping"
    },
  }
});

const options = {
  hostname: "localhost",
  port: 5020,
  path: "/api/register",
  method: "POST",
  headers: 
    { 
      'Content-Type' : 'application/json',
      'Content-Length': data.length
    },
    agent: new Agent({ rejectUnauthorized: false })
};

console.log("initiating request send off");

const req = https.request(options, res => {
  console.log(`status code : ${res.statusCode}`)

  res.on("data", d => {
    process.stdout.write(d)
    })
})

req.on("error", error => {
    console.error(error)
  })

console.log("request created");
req.write(data);
console.log("request written");
req.end();
/*
  const announceJson = {
  method: 'POST',
};
  fetch("localhost:5020/api/register",
    announceJson).then(res => res.json()).then(console.log("updated, " + JSON.stringify(res)));
}
*/
app.listen(listen_port);
console.log("Ping listening on port 5034");
