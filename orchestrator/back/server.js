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
  };
};





server = ServerMain("ServiceOrchestrator", 5020);

router.get("/api/ports", async (req, res) => {
const { caller, ports, authtoken, target } = req.body;
let val = await authenticateToken(authToken);
await seek(target);



router.get("/api/services")
router.get("/api/workload")

