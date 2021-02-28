const express = require("express");
const process = require("process");

const app = express();

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


class ServerMain extends AbstractService{
  constructor(name, port){
    super(name, port);
    //this.lookup = {}
    this.lookup = new Map();
    this.availablePorts = {}
    this.addService = this.addService.bind(this);
    this.getService = this.getService.bind(this);
  };
  

  addService(serviceName, servicePort){
    if (!this.lookup.has(serviceName)){ //[serviceName]){
      //this.lookup[serviceName] = {"title" : serviceName, "port" : servicePort};
      console.log("adding service");
      this.lookup.set(serviceName, servicePort);
      return true;
    }
    console.log("service wasnt found ");
    return false;
  }
  
  getService(serviceName){
    return this.lookup[serviceName];
  }
};

server = new ServerMain("ServiceOrchestrator", PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {
  console.log(req.body);

  // console.log(req);
  const { caller, callerListenPort } = req.body;
  
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

app.get("/api/search", (req, res) => {
  
  const service = server.getService(requestedService);
  console.log("api search hit with get");
  console.log(req);
  if (service){
    return res.status(200).json({
      "port" : service.listening
    });
  }
  else{
    return res.satus(400).json({
      "error" : "requested service" + requestedService + " not found on registry."
    });
  }
});


app.get("/api/services", (req, res) => {
  let services = Object.fromEntries( server.lookup );
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
