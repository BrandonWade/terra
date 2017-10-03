import json
import os
import ctypes
import storage
import image
from flask import Flask, render_template, send_from_directory
from PIL import ImageFile
from pprint import pprint

app = Flask(__name__, template_folder='app', static_folder='app/dist')
storage.init_db()

@app.route('/')
def index():
    image.get_new_images()
    images = storage.get_images()
    images_json = json.dumps([ dict(image) for image in images ])

    return render_template('app.html', images_json=images_json)

@app.route('/images')
def fetch():
    return ('fetch images', 200)

@app.route('/images/<reddit_id>', methods=['POST'])
def set(reddit_id):
    image = storage.get_image(reddit_id)
    name = image['reddit_id'] + '.' + image['file_type']
    image_path = os.path.join(app.root_path, storage.GALLERY_DIR, name)
    SPI_SETDESKWALLPAPER = 20
    ctypes.windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, image_path, 3)
    return (name, 200)

@app.route('/images/<reddit_id>', methods=['DELETE'])
def delete(reddit_id):
    image = storage.get_image(reddit_id)
    name = image['reddit_id'] + '.' + image['file_type']
    storage.delete_image(reddit_id)
    image_path = os.path.join(storage.GALLERY_DIR, name)
    os.remove(image_path)
    return (name, 200)

@app.route('/images/<file_name>')
def get(file_name):
    return send_from_directory(app.root_path + '/gallery/', file_name)
