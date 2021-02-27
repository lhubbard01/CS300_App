import {express, Router} from "express";
const router = Router();





















class AbstractService{
  constructor(name, port){
    this.name = name;
    this.port = port;
  }
}


class Service extends AbstractService
{
  constructor(name, port, listening, orch_port){
    super(name, port);
    this.listening = listening;
    this.orch = orch;
  }


};


class ServerMain extends AbstractService{
  constructor(name, port){
    super(name, port);
    this.lookup = Map();
    this.availablePorts = Map();
    this.addService = this.addService.bind(this);
    this.getService = this.getService.bind(this);
  };
  

  addService(serviceName, servicePort){
    if (!this.lookup.get(serviceName){
      this.lookup.put(serviceName, servicePort);
      return true;
    }
    return false;
  }
  
  getService(serviceName){
    return this.lookup.get(serviceName);
  }
};

server = ServerMain("ServiceOrchestrator", 5020);
router.post("/api/register", (req, res) => {
  const { caller, callerListenPort } = req.body;
  let outcome = server.addService(caller, callerListenPort);
  if (outcome){
    res.body = {}
  }
  else{
    res.body = {}
  }
});




/*router.get("/api/ports", async (req, res) => {
  const { caller, ports, authtoken, target } = req.body;

//let val = await authenticateToken(authToken);
await seek(target);*/



//router.get("/api/services")
//router.get("/api/workload")
//router.delete("/api/register", (req, res) => {});
