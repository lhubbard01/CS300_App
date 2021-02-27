import argparse
parser = argparse.ArgumentParser()
parser.add_argument("path", type = str)
args = parser.parse_args()

with open("./package.json", "r") as f:
  scriptsFlag = False
  lines = []
  for i, line in enumerate(f.readlines()):
    if "scripts" in line and not scriptsFlag:
      scriptsFlag = True
    if "launch" in line and scriptsFlag:
      lineno = i
    if "}" in line and scriptsFlag:

      scriptsFlag = False
    lines.append(line)



with open("./package.json","w") as f:
  for i, line in enumerate(lines):
    if i == lineno:
      line += " \"npm run start --prefix " + path + " \""
    f.write(line + "\n")
print("added " + path + " to microservice launcher script")

