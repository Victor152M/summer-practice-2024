from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from . import routes
from . import models

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy()
db.init_app(app)