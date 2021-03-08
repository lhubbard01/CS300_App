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

     

def write(files: dict):
  f = open("screen_rc","w")
  f.write("""escape xy

hardstatus alwayslastline
hardstatus string '%{= kG}[%{G}%H%? %1`%?%{g}][%= %{= kw}%-w%{+b yk} %n*%t%?(%u)%? %{-}%+w %=%{g}][%{B}%m/%d %{W}%C%A%{g}]'
""")
  j = 0
  for i, title in enumerate(files.keys()):
    j = i
    f.write(f"""
screen -t {title}  {i}  bash
""")
  f.write(f"""
screen -t MAIN {j + 1} zsh
""")
  if len(files.keys()) > 16:
    raise Exception("build multiple windows as TODO")
  if len(files.keys()) > 6: f.write("select 0\nsplit\nfocus up\nsplit -v\nfocus right\n")
  else: f.write("select 0\nsplit -v\nfocus right\n")
  for i in range(1, len(files.keys())):
    f.write(f"""select {i}\nsplit -v\nfocus next\n""")
    if i == 6: f.write("select 0;\nfocus down\n");

  f.write("""
bind -c rsz \t    eval "focus"       "command -c rsz" # Tab
bind -c rsz -k kl eval "focus left"  "command -c rsz" # Left
bind -c rsz -k kr eval "focus right" "command -c rsz" # Right
bind -c rsz -k ku eval "focus up"    "command -c rsz" # Up
bind -c rsz -k kd eval "focus down"  "command -c rsz" # Down
""")
  for i, loc in enumerate(files.keys()):
    f.write(f"select {i}\nstuff \"cd {files[loc]['abs']}^M\"\nstuff \"npm run start^M\"\nfocus next\n")
  f.close()



















  #--hold -e $SHELL 
  #launch_str = lambda s: "konsole  \"npm run start --prefix " + s + "\" & "
def main(opts):
  print("launching the register services")
  if opts["find_servers"]:
    out = []
    for f in os.listdir(os.path.realpath(".")):
      if os.path.isdir(f) and "node_modules" not in f and ".git" not in f:
        out += walking(f)
    with open("servers","w") as f:
      for path in out:
        serv, fb = path.split(os.path.sep)[-2:] 
        f.write( serv + os.path.sep + fb + "," + path + "\n")

  files = {}
  with open("servers","r") as f:
    for line in f.readlines():
      if len(line) == 1:
        continue
      fields = line.strip().split(",")
      print(fields)
      files[fields[0]] = {"abs": fields[1]}
 
  write(files)

  frompy = opts["pylaunch"]

  if frompy:
    subprocess.run(" konsole --new-tab -e $SHELL -c \"screen -c screen_rc -t runtime\"", shell = True)
  else:
    print("execute screen -c screen_rc to launch")
  
  """
  else:
    with open("./launch","w") as f:
      f.write("#!/bin/bash\n")
      f.write(cmd_str + "\n")
    os.chmod("./launch", 755)
    print("execute ./launch to launch the session")"""

if __name__ == "__main__":

  import argparse
  parser = argparse.ArgumentParser()
  parser.add_argument("-f","--servers", type=str, help = "server declaration file for inclusion in screen script")
  parser.add_argument("-p","--pylaunch", action="store_true", help = "launch from a subprocess initiated from python")
  opts = vars(parser.parse_args())
  opts["find_servers"] = (True if not opts["servers"] else False)
  main(opts)
