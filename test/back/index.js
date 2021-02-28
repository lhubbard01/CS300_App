const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("http");
const Agent = https.Agent;
const morgan = require("morgan");
const app = express();
const orchestratorPort = 5020;
//Declared routes and Routers
//import testRouter from "./routes/testRouter";
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));



//networking definitions and startup
const port = process.env.PORT || 5050;

const data = JSON.stringify( {
  'name': 'TestService',
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


const getLogin = JSON.stringify( {
  'name': 'login'
});

const optSearch = {
  hostname: "localhost",
  port: 5020,
  path: "/api/search",
  method: "POST",
  headers: 
    { 
      'Content-Type' : 'application/json',
      'Content-Length': getLogin.length
    },
    agent: new Agent({ rejectUnauthorized: false })
};

 
console.log("initiating request send off Search");

const reqSearch = https.request(optSearch, res => {
  console.log(`status code : ${res.statusCode}`)
  res.on("data", d => {
    process.stdout.write(d)
    })
})

req.on("error", error => {
    console.error(error)
  })

console.log("request created");
req.write(getLogin);


app.listen(port);
console.log("TestService listening on port 5050");
