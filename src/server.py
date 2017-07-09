import requests
import json
import os
import ctypes
import hashlib
import urllib.request
import storage
from image import Image
from flask import Flask, render_template, abort, request, send_from_directory
from pprint import pprint

app = Flask(__name__, template_folder='app', static_folder='app/dist')

IMAGE_LIMIT = 20
API_ENDPOINT = 'https://www.reddit.com/r/earthporn/top.json?limit=' + str(IMAGE_LIMIT)

storage.init_db()

@app.route('/')
def index():
    download_images()
    images = get_images_from_gallery(storage.GALLERY_DIR)
    images_json = json.dumps([image.__dict__ for image in images])

    return render_template('app.html', images_json=images_json)

@app.route('/set/<name>', methods=['POST'])
def set(name):
    image_path = os.path.join(app.root_path, storage.GALLERY_DIR, name)
    SPI_SETDESKWALLPAPER = 20
    ctypes.windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, image_path, 3)
    return (name, 200)

@app.route('/delete/<name>', methods=['DELETE'])
def delete(name):
    storage.ignore_image(name)
    image_path = os.path.join(storage.GALLERY_DIR, name)
    os.remove(image_path)
    return (name, 200)

@app.route('/images/<path:filename>')
def serve_gallery(filename):
    return send_from_directory(app.root_path + '/gallery/', filename)

def download_images():
    headers = {
        'User-Agent': 'python:terra:1.0'
    }

    req = requests.get(API_ENDPOINT, headers=headers)
    if req.status_code != 200:
        abort(req.status_code)

    raw_json = json.loads(req.content)
    images = raw_json['data']['children']

    if not os.path.exists(storage.GALLERY_DIR):
        os.makedirs(storage.GALLERY_DIR)

    ignore_list = storage.get_ignore_list()
    for curr_img in images:
        image = curr_img['data']
        name = image['title']

        # TODO: Calculate these values
        width = 0
        height = 0
        file_size = 0

        storage.insert_image(name, width, height, file_size, False)

        name_hash = hashlib.md5(image['title'].encode()).hexdigest()
        file_path = os.path.join(storage.GALLERY_DIR, str(name_hash) + '.jpg')

        if str(name_hash) + '.jpg' in ignore_list:
            continue

        if not os.path.isfile(file_path):
            resource = urllib.request.urlopen(image['url'])
            output = open(file_path, 'wb')
            output.write(resource.read())
            output.close()

def get_images_from_gallery(path):
    images = []
    for f in os.listdir(path):
        if f != 'ignore.txt' and os.path.isfile(os.path.join(path, f)):
            image = Image()
            image.name = f
            image.path = os.path.join('images', f)
            images.append(image)

    return images
