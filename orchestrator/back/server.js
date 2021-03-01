const express = require("express");
const process = require("process");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(morgan("common", {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

const PORT = 5020;



class AbstractService{
  constructor(name, port){
    this.name = name;
    this.port = port;
  }
}


class Service extends AbstractService
{
  constructor(name, port){
    super(name, port);
  }


};

class Dict{

  constructor(){
    this.mapping = {
    };
    this.has = this.has.bind(this);
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  };
  

  has ( key ) {
    if (!this.mapping[key]) return false;
    else return true;
  }

  get ( key ) {
    return this.mapping[key];
  }

  set ( key, value ) { 
    console.log(key);
    console.log(value);
    this.mapping[key] = value;
    console.log(this.mapping);
    console.log(this.mapping[key]);
  }
}

class ServerMain extends AbstractService{
  constructor(name, port){
    super(name, port);
    //this.lookup = {}
    this.lookup = new Dict();
    this.availablePorts = {}
    this.addService = this.addService.bind(this);
    this.getService = this.getService.bind(this);
  };
  

  addService(serviceName, servicePort){
    if (!this.lookup.has(serviceName)){ //[serviceName]){
      //this.lookup[serviceName] = {"title" : serviceName, "port" : servicePort};
      console.log("adding service");
      this.lookup.set(serviceName, servicePort);
      console.log(serviceName);
      console.log(servicePort);
      return true;
    }
    let cond = JSON.stringify(this.lookup);
    console.log(cond);
    console.log("service wasnt found ");
    return false;
  }
  
  getService(serviceName){
    return this.lookup.get(serviceName);
  }
};

server = new ServerMain("ServiceOrchestrator", PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {

  // console.log(req);
  const {name, port} = req.body;
  const caller = name;
  const callerListenPort = port;
  console.log(caller , callerListenPort );
  console.log(req.body);
  let outcome = server.addService(caller, callerListenPort);
  
  console.log(JSON.stringify(outcome));
  if (outcome){
    return res.status(200).json(
      {
        "message": "service " + caller + ":" + callerListenPort + " added to orchestrator"
      });
  }
  
  


  else{
    return res.status(400).json(
      {
        "error": "service " + caller + "unable to be added to orchestration database for unknown reason"
      })
  }
});

app.post("/api/search", (req, res) => {
  
  
  const {name} = req.body;
  const service = server.getService(name ); //requestedService);

  console.log(req);
  if (service){
    return res.status(200).json({
      "service_name" : name,
      "port" : service
    });
  }
  else{
    return res.status(400).json({
      "error" : "requested service" + requestedService + " not found on registry."
    });
  }
});


app.get("/api/services", (req, res) => {
  let services = server.lookup;
  console.log(JSON.stringify(services));
  return res.status(200).json(Array(JSON.stringify(services)));
} );

app.listen(PORT);
console.log("orchestrator listening at port " + PORT);


/*router.get("/api/ports", async (req, res) => {
  const { caller, ports, authtoken, target } = req.body;

//let val = await authenticateToken(authToken);
await seek(target);*/



//router.get("/api/services")
//router.get("/api/workload")
//router.delete("/api/register", (req, res) => {});
