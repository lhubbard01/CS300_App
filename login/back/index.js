const express = require("express");
const https = require("http");
const properties = require("./package.json");
const SignupRouter  = require("./routes/signup");
const manifest = properties.manifest;


const app = express();
app.use(SignupRouter);

//networking definitions and startup
const port = process.env.PORT || 5040;


async function announceSpinup(){
  const data = JSON.stringify( {"name": manifest.name, "manifest": manifest
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
    //agent: new Agent({ rejectUnauthorized: false })
  };
  console.log("initiating request send off");

  const req = https.request(options, res => {
  console.log(`status code : ${res.statusCode}`)
  res.on("data", d => {
    process.stdout.write(d)
    });
  })

  req.on("error", error => {
    console.error(error)
  });

  console.log("request created");
  req.write(data);
  req.end();
}
announceSpinup();

app.listen(port);
console.log("Login listening on port 5040");
