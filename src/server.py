import requests
import json
from flask import Flask, render_template, abort
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

    images_json = json.loads(req.content)

    return render_template('app.html', images_json=images_json)
