import requests
import json
import os
import urllib.request
import storage
from PIL import ImageFile
from flask import abort

IMAGE_LIMIT = 20
API_ENDPOINT = 'https://www.reddit.com/r/earthporn/top.json?limit=' + str(IMAGE_LIMIT)

def get_new_images():
    images = get_image_data()

    if not os.path.exists(storage.GALLERY_DIR):
        os.makedirs(storage.GALLERY_DIR)

    for image in images:
        download_image(image['data'])

def get_image_data():
    headers = {
        'User-Agent': 'python:terra:1.0.0'
    }

    req = requests.get(API_ENDPOINT, headers=headers)
    if req.status_code != 200:
        abort(req.status_code)

    raw_json = json.loads(req.content)

    return raw_json['data']['children']

def download_image(image):
    reddit_id = image['id']

    if not storage.image_exists(reddit_id):
        response = urllib.request.urlopen(image['url'])
        contents = response.read()

        parser = ImageFile.Parser()
        parser.feed(contents)

        if parser.image != None:
            title = image['title']
            file_size = response.getheader('Content-Length')
            width, height = parser.image.size
            file_type = parser.image.format.lower()

            if file_type == 'jpeg':
                file_type = 'jpg'

            output = open(os.path.join(storage.GALLERY_DIR, reddit_id + '.' + file_type), 'wb')
            output.write(contents)
            output.close()

            storage.insert_image(reddit_id, title, width, height, file_size, file_type)
