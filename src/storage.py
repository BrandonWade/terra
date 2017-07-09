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
           reddit_id TEXT,
           title TEXT,
           file_name TEXT,
           width INTEGER,
           height INTEGER,
           file_size INTEGER,
           is_ignored BOOLEAN,
           download_date DATETIME DEFAULT CURRENT_TIMESTAMP
       )'''
    )
    cursor.execute('''
        CREATE UNIQUE INDEX IF NOT EXISTS rid
        ON images (reddit_id)
    ''')
    db.commit()

def insert_image(reddit_id, title, file_name, width, height, file_size, is_ignored):
    db = sqlite3.connect('storage.db')
    cursor = db.cursor()
    cursor.execute('''
        INSERT OR IGNORE INTO images (reddit_id, title, file_name, width, height, file_size, is_ignored)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        reddit_id,
        title,
        file_name,
        width,
        height,
        file_size,
        is_ignored
    ))
    db.commit()

def ignore_image(name):
    return
