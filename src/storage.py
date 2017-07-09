import sqlite3
import os

GALLERY_DIR = 'gallery'

def init_db():
    db = sqlite3.connect('storage.db')
    cursor = db.cursor()
    cursor.execute('''
       CREATE TABLE IF NOT EXISTS
       images (
           id INTEGER PRIMARY KEY,
           name TEXT,
           width INTEGER,
           height INTEGER,
           file_size INTEGER,
           is_ignored BOOLEAN,
           download_date DATE DEFAULT NOW
       )'''
    )
    db.commit()

def get_ignore_list():
    ignore_list = []
    ignore_path = os.path.join(GALLERY_DIR, 'ignore.txt')
    with open(ignore_path) as f:
        ignore_list = {line.strip() for line in f}

    return ignore_list

def insert_image(name, width, height, file_size, is_ignored):
    db = sqlite3.connect('storage.db')
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO images (name, width, height, file_size, is_ignored)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        name,
        width,
        height,
        file_size,
        is_ignored
    ))
    db.commit()

def ignore_image(name):
    ignore_path = os.path.join(GALLERY_DIR, 'ignore.txt')
    with open(ignore_path, 'a') as f:
        f.write(name + '\n')
