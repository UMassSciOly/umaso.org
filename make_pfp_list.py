import os
import json

directory = './img/pfp'
files = os.listdir(directory)

with open('pfp_img_list.json', 'w') as f:
    json.dump({file.split(".")[0]:file.split(".")[1] for file in files if "." in file}, f)