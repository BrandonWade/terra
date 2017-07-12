import sqlite3
import os

GALLERY_DIR = 'gallery'
db = sqlite3.connect('storage.db')

def init_db():
    cursor = db.cursor()
    cursor.execute('''
       CREATE TABLE IF NOT EXISTS
       images (
           id INTEGER PRIMARY KEY,
           reddit_id TEXT,
           title TEXT,
           width INTEGER,
           height INTEGER,
           file_size INTEGER,
           file_type TEXT,
           is_deleted BOOLEAN DEFAULT 0,
           download_date DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'localtime'))
       )'''
    )
    cursor.execute('''
        CREATE UNIQUE INDEX IF NOT EXISTS rid
        ON images (reddit_id)
    ''')
    db.commit()

def insert_image(reddit_id, title, width, height, file_size, file_type):
    cursor = db.cursor()
    cursor.execute('''
        INSERT OR IGNORE INTO images (reddit_id, title, width, height, file_size, file_type)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        reddit_id,
        title,
        width,
        height,
        file_size,
        file_type
    ))
    db.commit()

def get_image(reddit_id):
    cursor = db.cursor()
    cursor.execute('''
        SELECT *
        FROM images
        WHERE reddit_id = ?
    ''', (
        reddit_id,
    ))

    return cursor.fetchone()

def image_exists(reddit_id):
    return get_image(reddit_id) != None

def delete_image(reddit_id):
    cursor = db.cursor()
    cursor.execute('''
        UPDATE images
        SET is_deleted = 1
        WHERE reddit_id = ?
    ''', (
        reddit_id,
    ))
    db.commit()

def get_images():
    db.row_factory = sqlite3.Row
    cursor = db.cursor()
    cursor.execute('''
        SELECT
        *,
        reddit_id || '.' || file_type AS 'file_name',
        'images/' || reddit_id || '.' || file_type  AS 'url'
        FROM images
        WHERE is_deleted = 0
        ORDER BY id DESC
    ''', ())

    return cursor.fetchall()
