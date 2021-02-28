import os
import subprocess

def walking(x):

  os.chdir(x)
  files = os.listdir(os.getcwd())
  out = []
  sep= os.path.sep
  children_flag = False

  for f in files:
    if os.path.isdir(f) and "node_module" not in f:
      out += walking(f)
      
      
      children_flag = True
    elif "package.json" in f and not children_flag:
      out.append(os.getcwd())
  
  os.chdir("..")
  return out

print("launching the register services")
out = []
for f in os.listdir(os.path.realpath(".")):
    if os.path.isdir(f) and "node_modules" not in f and ".git" not in f:
      out += walking(f)

executable_directories = out
#--hold -e $SHELL 
launch_str = lambda s: "konsole  \"npm run start --prefix " + s + "\" & "

cmd_str = ""
for server in executable_directories:
  cmd_str += launch_str(server)

print("generated command string " + cmd_str)

































frompy = False

if frompy:
  subprocess.run(cmd_str, shell = True)

else:
  with open("./launch","w") as f:
    f.write("#!/bin/bash\n")
    f.write(cmd_str + "\n")
  os.chmod("./launch", 755)
  print("execute ./launch to launch the session")
