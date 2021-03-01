const express = require("express");
const https = require("http");
const Agent = https.Agent;
const app = express();
//networking definitions and startup
const orchestratorPort = 5020;
//Declared routes and Routers
//const createRouter = require( "./routes/createRouter" );
//const loginRouter  = require("./routes/loginRouter" );
//app.use(createRouter);
//app.use(loginRouter);


//networking definitions and startup
const port = process.env.PORT || 5040;

const data = JSON.stringify( {
  'name': 'Login',
  'port': port
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

app.listen(port);
console.log("Login listening on port 5040");
