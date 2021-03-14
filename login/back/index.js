const express    = require("express");
const helmet     = require("helmet");
const http       = require("http");
const bodyParser = require("body-parser");
const properties = require("./package.json");
const manifest   = properties.manifest;
const {createProxyMiddleware} = require("http-proxy-middleware");
const LoginModel = require("./login");
const conn = require("./conn")
const app = express();
//networking definitions and startup
const port = process.env.PORT || 5040;


app.use(helmet())
async function announceSpinup(){
  const data = JSON.stringify({
    name     : manifest.name,
    manifest : manifest
  });

  console.log(data);


  console.log(data.length);
  const options = {
    hostname : "localhost",
    port     : 5020,
    path     : "/api/register",
    method   : "POST",
    headers  : { 
      'Content-Type' : 'application/json',
      'Content-Length': data.length
    },
  };

  console.log("initiating request send off");

  const req = http.request(options, res => {
    
    console.log(`status code : ${res.statusCode}`)
    
    res.on("data", d => {
      process.stdout.write(d)
    });
  });

  req.on("error", error => {
    console.error(error)
  });

  console.log("request created");
  
  req.write(data).catch(err => console.error(error))
  req.end();
}





app.post("/api/login", (req, res) => {
  const loginOpts        = req.body; 
  const loginCredentials = new LoginModel(loginOpts);
  res.status(200).send();
});
app.get("/api/login", (req, res) => {
  res.status(200).send();
})

app.post("/api/signup", bodyParser.json(),(req, res) => {
  LoginModel.find({username: req.body.username}, (err, result) => {
    if (result.length > 0){
      console.log("DUPLICATE!! " , result);
      res.status(500).json({
          msg: "username already exists"
        });
      
      return res;
    } else {
      console.log("UNIQUE UN, EMAIL, PUSHING")
      const lm = LoginModel(req.body);
      lm.save()
        .then(ob => console.log("MONGO PUSH  ", ob))
        .then(res.status(200)
                  .json({msg: "added"})
              )
        .catch(err => {
           console.error(err);
           }
        );
      }
  })
});



  //const o = lm.save().then(o => console.log(o));

  //only after being validated and sanitized
  //res.status(200).json(o);



  
setTimeout(announceSpinup, 5000);


app.listen(port);
console.log("Login listening on port 5040");
