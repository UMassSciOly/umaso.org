import os
import json

# update pfp_img_list.json

directory = './img/pfp'
files = os.listdir(directory)

with open('pfp_img_list.json', 'w') as f:
    json.dump({file.split(".")[0]:True for file in files if "." in file}, f)

# compress photos

from PIL import Image

for file_name in files:
    if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
        if "." in file_name:
            file_path = os.path.join(directory, file_name)
            curr_img = Image.open(file_path)
            name = file_name.split(".")[0]
            if curr_img.size[0] > 200 or curr_img.size[1] > 200:
                curr_img = curr_img.resize((200, 200), Image.LANCZOS)
            
            quality = 100
            if os.path.getsize(file_path) > 100000:
                quality = 20
            curr_img.save(os.path.join(directory, f"{name}.png"), optimize=True, quality=20)