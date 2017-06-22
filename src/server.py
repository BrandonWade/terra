from flask import Flask, render_template
app = Flask(__name__, template_folder='app', static_folder='app/dist')

@app.route('/')
def index():
    return render_template('app.html')
