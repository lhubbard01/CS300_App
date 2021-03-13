const express    = require("express");
const http       = require("http");

const properties = require("./package.json");
const manifest   = properties.manifest;

const LoginModel = require("./login.js");

const app = express();
app.use(SignupRouter);

//networking definitions and startup
const port = process.env.PORT || 5040;


async function announceSpinup(){
  const data = {
    name     : manifest.name,
    manifest : manifest
  });

  const options = {
    hostname : "localhost",
    port     : 5020,
    path     : "/api/register",
    methoe   : "POST",
    headers  : { 
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
  });

  req.on("error", error => {
    console.error(error)
  });

  console.log("request created");
  
  req.write(data);
  req.end();
}



app.post("/api/signup", (req, res) => {
  
  //only after being validated and sanitized
  const loginOpts        = req.body; 
  const loginCredentials = new LoginModel(loginOpts);
  
  console.log(JSON.stringify(
    loginCredentials
    )
  );

  loginCredentials.save();
  
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req));
  
  res.status(200);

});


announceSpinup();


app.listen(port);
console.log("Login listening on port 5040");
