import requests
import json
import os
import ctypes
import hashlib
import urllib.request
from image import Image
from flask import Flask, render_template, abort, request, send_from_directory
from pprint import pprint

app = Flask(__name__, template_folder='app', static_folder='app/dist')

IMAGE_LIMIT = 20
API_ENDPOINT = 'https://www.reddit.com/r/earthporn/top.json?limit=' + str(IMAGE_LIMIT)
GALLERY_DIR = 'gallery'

@app.route('/')
def index():
    download_images()
    images = get_images_from_gallery(GALLERY_DIR)
    images_json = json.dumps([image.__dict__ for image in images])

    return render_template('app.html', images_json=images_json)

@app.route('/set/<name>', methods=['POST'])
def set(name):
    image_path = os.path.join(app.root_path, GALLERY_DIR, name)
    SPI_SETDESKWALLPAPER = 20
    ctypes.windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, image_path, 3)
    return (name, 200)

@app.route('/delete/<name>', methods=['DELETE'])
def delete(name):
    ignore_file(name)
    image_path = os.path.join(GALLERY_DIR, name)
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

    if not os.path.exists(GALLERY_DIR):
        os.makedirs(GALLERY_DIR)

    ignore_list = get_ignore_list()
    for curr_img in images:
        image = curr_img['data']
        name_hash = hashlib.md5(image['title'].encode()).hexdigest()
        file_path = os.path.join(GALLERY_DIR, str(name_hash) + '.jpg')

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

def get_ignore_list():
    ignore_list = []
    ignore_path = os.path.join(GALLERY_DIR, 'ignore.txt')
    with open(ignore_path) as file:
        ignore_list = [line.strip() for line in file]

    return ignore_list

def ignore_file(name):
    ignore_path = os.path.join(GALLERY_DIR, 'ignore.txt')
    with open(ignore_path, 'a') as file:
        file.write(name + '\n')
