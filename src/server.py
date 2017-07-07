import requests
import json
import os
import hashlib
import urllib.request
from image import Image
from flask import Flask, render_template, abort, request, send_from_directory
from pprint import pprint

app = Flask(__name__, template_folder='app', static_folder='app/dist')

IMAGE_LIMIT = 20
API_ENDPOINT = 'https://www.reddit.com/r/earthporn/top.json?limit=' + str(IMAGE_LIMIT)

@app.route('/')
def index():
    headers = {
        'User-Agent': 'python:terra:1.0'
    }

    req = requests.get(API_ENDPOINT, headers=headers)
    if req.status_code != 200:
        abort(req.status_code)

    raw_json = json.loads(req.content)
    images = raw_json['data']['children']

    if not os.path.exists('gallery'):
        os.makedirs('gallery')

    for curr_img in images:
        image = curr_img['data']
        name_hash = hashlib.md5(image['title'].encode()).hexdigest()
        file_path = 'gallery\\' + str(name_hash) + '.jpg'

        if not os.path.isfile(file_path):
            resource = urllib.request.urlopen(image['url'])
            output = open(file_path, 'wb')
            output.write(resource.read())
            output.close()

    images = get_images('gallery\\')
    images_json = json.dumps([image.__dict__ for image in images])

    return render_template('app.html', images_json=images_json)

@app.route('/set/<name>', methods=['POST'])
def set(name):
    return ('', 204)

@app.route('/delete/<name>', methods=['DELETE'])
def delete(name):
    return ('', 204)

@app.route('/gallery/<path:filename>')
def serve_gallery(filename):
    return send_from_directory(app.root_path + '/gallery/', filename)

def get_images(path):
    images = []
    for f in os.listdir(path):
        if os.path.isfile(os.path.join(path, f)):
            image = Image()
            image.path = os.path.join(path, f)
            images.append(image)

    return images
