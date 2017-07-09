import sqlite3
import os

GALLERY_DIR = 'gallery'

def init_db():
    db = sqlite3.connect('storage')
    cursor = db.cursor()
    cursor.execute('''
       CREATE TABLE IF NOT EXISTS images (
       id INTEGER PRIMARY KEY,
       name TEXT,
       width INTEGER,
       height INTEGER,
       file_size INTEGER,
       is_ignored BOOLEAN,
       download_date DATE
    )''')
    db.commit()

def get_ignore_list():
    ignore_list = []
    ignore_path = os.path.join(GALLERY_DIR, 'ignore.txt')
    with open(ignore_path) as f:
        ignore_list = {line.strip() for line in f}

    return ignore_list

def ignore_file(name):
    ignore_path = os.path.join(GALLERY_DIR, 'ignore.txt')
    with open(ignore_path, 'a') as f:
        f.write(name + '\n')
