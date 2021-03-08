def write(f, opts):
  f.write("const properties = require(\"./genAPI.json\");\n")
  f.write("""const http = require("http");\n""")
  f.write("""const fetch = require("node-fetch");\n""")
  f.write("//Client API\n")
  apifn = []
  for action in opts["actions"].keys():
    apifn.append("    this." + action + " = this." + action + ".bind(this);\n")
  f.write("""const express = require("express");
class """ + opts["serviceName"] + """Client {
  constructor(){
    """)
  for actionDecl in apifn:
    f.write(actionDecl)


  f.write("""
  };


  """)



  actions = opts["actions"]
  for action in actions.keys():
    args = ""
    for arg in actions[action]["args"]:
      args += arg + ", "
    args = args[:-2]
    f.write("  "  + action + "( " + args + " ) {")
    argsind = args.split(",")
    datajson = ""
    for argind in argsind:
      datajson += "\""+ argind + "\" : \"" + argind + "\","
    datajson = datajson[:-1]
    f.write("""
    let data = JSON.stringify({""" + datajson + """};
    let options = {
      method: \"""" + actions[action]["method"] + """\",
      headers: {\"Content-Type\": "application/json", \"Content-Length\": data.length },
      hostname: """ + actions[action]["host"] + """,
      port: """ + actions[action]["port"] + """, path: """ + actions[action]["path"] + """
    };
    """)
    f.write("options[\"body\"] = data;\n" if "GET" not in actions[action]["method"] else "")
    f.write("    const out = await fetch(options).then(res => res.json());\n")
    f.write("    return out;\n  }\n")
  f.write("export default " + opts["serviceName"] + "Client;\n")
  return f


if __name__ == "__main__":
  opts = {"serviceName":"Clickables", "actions" : {"onClick":{"args": [], "method": "GET", "host" : "localhost", "port": str(5020), "path" : "/api/services"}, } }
  f = open("auth", "w")
  write(f, opts)
  f.close()

