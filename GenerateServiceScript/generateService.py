import argparse
import os
import re

def writePackage(opts):
  name = opts["name"]
  description = (opts["description"] if "description" in opts.keys() else "")
  if not os.path.isfile("package.json"):
    with open("package.json" , "w") as f:
      f.write("""
{
  "name": """ + name + """,
  "version": "0.0.1",
  "description": """ + description + """
  "main": "./index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
""")

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
    if opts["generate_package"]:
      writePackage(prefix + "back")

  if not os.path.isdir(prefix + "front"):
    os.mkdir(prefix + "front")
    if opts["generate_package"]:
      writePackage(prefix + "back")

  if not os.path.isdir(prefix + "back/routes"):
    os.mkdir(prefix + "back/routes")



def genServer(opts):
  api = opts["API"]
  prefix = opts["prefix"]
  defdPort = opts["port"]
  
  router_imports_to_write = []




  with open(prefix + "back" + os.path.sep + "index.js","w") as f:
    f.write("""
const express = require("express");
const https = require("http");
const Agent = https.Agent;

const app = express();

//networking definitions and startup
const orchestratorPort = 5020;
""")
    f.write("//Declared routes and Routers\n")
    for endpoint in api["endpoints"].keys():
      f.write("import " + endpoint + "Router from \"./routes/" + endpoint + "Router\";\n")

      router_imports_to_write.append("app.use(" + endpoint + "Router);\n")

    [  f.write( route ) for route in router_imports_to_write  ]

   
    f.write("\n\n//networking definitions and startup\n")
    f.write("const port = process.env.PORT || " + defdPort + ";\n")
    


    if not opts["quiet_spinup"]:
      announceJSON_section = """
const data = JSON.stringify( {
  'name': '""" + opts["name"] + """',
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
req.write(data);"""

      f.write(announceJSON_section)
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


def verb(method_verb, target):
  payload = ""
  if method_verb not in "get":
    payload += """
const data = JSON.stringify({
    BBBB: YYYY
    CCCC: ZZZZ,
});
"""
  payload += """
    const requestOptions = {
      method: """ + method_verb + """ 
      headers: {"Content-Type" : "application/json" },
"""

  if method_verb not in "get":
    payload+="body: data\n};\n"
  else:
    payload += "\n};\n"
  payload += """
  fetch(""" + target + """, req)
      .then(res => res.json())
      .then(XXXXX => this.setState({XXXXX},
        () => console.log("services have been fetched, here they are " + JSON.stringify())));
  }"""
  return payload
    
def genFront(opts):
  template = """
function APIButton extends Component{
  constructor(props){
    super(props);
    this.state = {}
    this.handleClick = this.handleClick.bind(this);
  }

  
  handleClick(event){
    event.target.value;
  }


};

function App extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div className=""" + opts["name"] + """FrontEndApp" />
      </div>
    );
  };
}
export default = App;
"""



  if not os.path.isdir(  opts["prefix"] + "front" + os.path.sep + "public" ):
    os.mkdir( opts["prefix"] + "front" + os.path.sep + "public")
 

  if not os.path.isdir(  opts["prefix"] + "front" + os.path.sep + "src" ):
    os.mkdir( opts["prefix"] + "front" + os.path.sep + "src")
    print("made src")

  if not os.path.isdir(  opts["prefix"] + "front" + os.path.sep + "src" + os.path.sep + "components"):
    os.mkdir(  opts["prefix"] + "front" + os.path.sep + "src" + os.path.sep + "components")
    print("made src/components")

  if not os.path.isfile(  opts["prefix"] + "front" + os.path.sep + "src" + os.path.sep + "App.js" ):
    with open(opts["prefix"] + "front" + os.path.sep + "src" + os.path.sep + "App.js", "w") as f:
      f.write(template)
    print("wrote src/App.js")

  if not os.path.isfile(  opts["prefix"] + "front" + os.path.sep + "public" + os.path.sep + "index.html"):
    with open(opts["prefix"] + "front" + os.path.sep + "public" + os.path.sep + "index.html", "w") as f:

      f.write("""
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <title>App</title>
  <body>
    <div id="root"></div>
  </body>
</html>""")
    print("wrote public/index.html")

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument("name", type = str, help = "microservice name")
  parser.add_argument("port", type = str, help = "listening port for service")
  parser.add_argument("-f", "--api_file", type = str, help = "API description is stored here, default is file title API in prefixed directory", default = "API")
  parser.add_argument("--prefix", type = str, help = "file prefixs for path, default is \"./\"", default = "./")
  parser.add_argument("-q", "--quiet_spinup", action = "store_true", help = "announces to orchestator server the deployment of new service")
  parser.add_argument("--url", type = str, help="settable url, default is localhost", default = "localhost")
  parser.add_argument("--generate_package", action = "store_true", help="generae package.json")
  opts = vars(parser.parse_args())
  if opts["prefix"]:
    opts["api_file"] = opts["prefix"] + opts["api_file"]
  opts["API"] = parseApiFile(opts["api_file"])
  genProjectSkeleton(opts)
  genAPI(opts)
  genFront(opts)
  genServer(opts)

  print("Project " + opts["name"] + " generated!!!")




if __name__ == "__main__":
  main()

