import requests
import json
import urllib.request
from flask import Flask, render_template, abort, request
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

    for image in images:
        resource = urllib.request.urlopen(image['data']['url'])
        output = open('gallery\\' + image['data']['title'] + '.jpg', 'wb')
        output.write(resource.read())
        output.close()

    images_json = json.dumps(req.content.decode("utf-8"))

    return render_template('app.html', images_json=images_json)

@app.route('/set/<name>', methods=['POST'])
def set(name):
    return ('', 204)

@app.route('/delete/<name>', methods=['DELETE'])
def delete(name):
    return ('', 204)
