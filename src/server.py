import requests
import json
import os
import ctypes
import urllib.request
import storage
from flask import Flask, render_template, abort, request, send_from_directory
from PIL import ImageFile
from pprint import pprint

app = Flask(__name__, template_folder='app', static_folder='app/dist')

IMAGE_LIMIT = 20
API_ENDPOINT = 'https://www.reddit.com/r/earthporn/top.json?limit=' + str(IMAGE_LIMIT)

storage.init_db()

@app.route('/')
def index():
    download_images()
    images = storage.get_images()
    images_json = json.dumps([ dict(image) for image in images ])

    return render_template('app.html', images_json=images_json)

@app.route('/set/<reddit_id>', methods=['POST'])
def set(reddit_id):
    name = reddit_id + '.jpg'
    image_path = os.path.join(app.root_path, storage.GALLERY_DIR, name)
    SPI_SETDESKWALLPAPER = 20
    ctypes.windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, image_path, 3)
    return (name, 200)

@app.route('/delete/<reddit_id>', methods=['DELETE'])
def delete(reddit_id):
    name = reddit_id + '.jpg'
    storage.delete_image(reddit_id)
    image_path = os.path.join(storage.GALLERY_DIR, name)
    os.remove(image_path)
    return (name, 200)

@app.route('/images/<file_name>')
def get(file_name):
    return send_from_directory(app.root_path + '/gallery/', file_name)

def download_images():
    headers = {
        'User-Agent': 'python:terra:1.0.0'
    }

    req = requests.get(API_ENDPOINT, headers=headers)
    if req.status_code != 200:
        abort(req.status_code)

    raw_json = json.loads(req.content)
    images = raw_json['data']['children']

    if not os.path.exists(storage.GALLERY_DIR):
        os.makedirs(storage.GALLERY_DIR)

    for curr_img in images:
        image = curr_img['data']
        reddit_id = image['id']

        if not storage.image_exists(reddit_id):
            response = urllib.request.urlopen(image['url'])
            contents = response.read()

            title = image['title']
            file_size = response.getheader('Content-Length')

            parser = ImageFile.Parser()
            parser.feed(contents)

            if parser.image != None:
                width, height = parser.image.size
            else:
                width, height = 0, 0

            output = open(os.path.join(storage.GALLERY_DIR, reddit_id + '.jpg'), 'wb')
            output.write(contents)
            output.close()

            storage.insert_image(reddit_id, title, width, height, file_size)
