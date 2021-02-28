import argparse
import os
import re


def parseApiFile(api_file: str) -> dict:
  front  = is_front  = False
  back   = is_back   = False
  routes = is_routes = False


  API = {"endpoints": {}}

  with open(api_file, "r") as f:
    candidate_endpoint = []
    route_name = ""
    new_route = False


    for line in f.readlines():
      if "FRONT" in line:
        front = is_front = True
      elif "BACK" in line:
        is_front = False
        back = is_back = True
    
      elif "ROUTES" in line and back:
        is_back = False
        is_routes = True
    
      elif is_routes:
      
        if "-" in line:
          line = re.sub(r"\s*","",line)        
          if line.count("-") == 2:
            if not new_route:
              raise Exception("Parsing error, decalred endpoint before naming route")
          
            http_verb = re.sub(r"-+", "", line)
            candidate_endpoint.append(http_verb)

          elif line.count("-") == 1:
            new_route = True
            route_name = re.sub(r"-+","",line)
    
      if len(line.strip()) == 0 and is_routes and line != " ":
        new_route = False
        API["endpoints"][route_name] = candidate_endpoint
        candidate_endpoint = []
        route_name = ""

  return API
          
    

def genProjectSkeleton(opts):
  api = opts["API"]
  prefix = ""
  if opts["prefix"]:
    prefix = opts["prefix"]
  if not os.path.isdir(prefix + "back"):
    os.mkdir(prefix + "back")
  if not os.path.isdir(prefix + "front"):
    os.mkdir(prefix + "front")
  if not os.path.isdir(prefix + "back/routes"):
    os.mkdir(prefix + "back/routes")


  









def genServer(opts):
  api = opts["API"]
  prefix = opts["prefix"]
  defdPort = opts["port"]
  
  router_imports_to_write = []




  with open(prefix + "index.js","w") as f:
    f.write("import express from \"express\";\n\n")
    f.write("//Declared routes and Routers\n")
    for endpoint in api["endpoints"].keys():
      
      f.write("import " + endpoint + "Router from \"./routes/" + endpoint + "Router\";\n")

      router_imports_to_write.append("app.use(" + endpoint + "Router);\n")

    f.write("const app = express();\n\n")
    [  f.write( route ) for route in router_imports_to_write  ]

   
    f.write("\n\n//networking definitions and startup\n")
    f.write("const orchestratorPort = 5020;\n"\
      + "const port = process.env.PORT || " + defdPort + ";\n")
    

    if not opts["quiet_spinup"]:
      announceJSON = "{\n"\
        + "  method: 'POST',\n"\



        + "  headers: \n"\
        + "  {\n"\
        + "      'ContentType' : 'application/json'\n"\
        + "  },\n"\
        + "  body: {\n"\
        + "    'name': '" + opts["name"] + "',\n"\
        + "    'port': port,\n"\
        + "  }\n"\
        + "};\n"

      f.write("const announceJson = " + announceJSON)
      f.write("\nconst announceOutcome = await fetch(\"" + opts["url"] + ":5020\", announceJson);\n")
      f.write("console.log(announceOutcome);")
    f.write("\n\napp.listen(port);")
    f.write("\nconsole.log(\"" + opts["name"] + " listening on port " + str(opts["port"]) + "\");")

    
def genAPI(opts):
  api = opts["API"]
  endpoints = api["endpoints"].keys()
  
  for endpoint in endpoints:
    with open(opts["prefix"] + "back/routes/" + endpoint + ".js","w") as f:
      f.write("import {express, Router} from \"express\";\nrouter = Router();\n")

      for verb in api["endpoints"][endpoint]:
        f.write("router." + verb.lower() + "(/api/" + endpoint + ", (req, res) => {\n});\n\n")

      routerOut = endpoint + "Router"
      f.write("const " + routerOut + " = router;\n"\
        + "export default = " + routerOut + ";\n")


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument("name", type = str, help = "microservice name")
  parser.add_argument("port", type = str, help = "listening port for service")
  parser.add_argument("-f", "--api_file", type = str, help = "API description is stored here, default is file title API in prefixed directory", default = "API")
  parser.add_argument("--prefix", type = str, help = "file prefixs for path, default is \"./\"", default = "./")
  parser.add_argument("-q", "--quiet_spinup", action = "store_true", help = "announces to orchestator server the deployment of new service")
  parser.add_argument("--url", type = str, help="settable url, default is localhost", default = "localhost")
  opts = vars(parser.parse_args())
  if opts["prefix"]:
    opts["api_file"] = opts["prefix"] + opts["api_file"]
  opts["API"] = parseApiFile(opts["api_file"])

  genProjectSkeleton(opts)
  genAPI(opts)
  genServer(opts)

  print("Project " + opts["name"] + " generated!!!")




if __name__ == "__main__":
  main()
