import argparse
import os

def remove(f, target_dir: str = ".", force: bool = False):
  if f in os.listdir(target_dir):
    if not force:
      choose = input(f"remove {f}?  y/n\n")
      if "y" in choose.lower() and len(choose) == 1:
        os.rm(f)
      else:
        print(f"file {f} skipped for delete")




def gather(f, target_dir, target_file, builder):
  if f in target_dir:


    fl_r = open(f, "r")
    fl_w = open(target_file, "w+")
    
    fl_w.write(fl_r.read())
    fl_w.write("\n")
    fl_w.close()
    fl_r.close()
  else:
    raise Exception(f"File {f} not found!")



def main():
  parser = argparse.ArgumentParser()  
  parser.add_argument("build")
  parser.add_argument("-f", "--force", action_store = True, help="forces build with force delete of previous build")
  opts = vars(parser.parse_args())

