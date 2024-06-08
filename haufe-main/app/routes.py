from flask import render_template, jsonify, request
from .models import Reccomandation, Group, User
from .__init__ import app
import json

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")

@app.route("/api/groups", methods=["POST"])
def upload_group():
    data = request.get_json()
    Group(**data).saveToDB()
    return data

@app.route("/profile", methods=["GET"])
def show_profile():
    return render_template("profile.html")

@app.route("/groups", methods=["GET"])
def show_groups():
    return render_template("groups.html")

@app.route("/api/recommendations", methods=["POST"])
def upload_recommandations():
    data = request.get_json()
    print(data)
    Reccomandation(**data).saveToDB()
    return data

# @app.route("/api/recommendations", methods=["GET"])
# def get_recommandations():
#     return jsonify(json_list=[i.to_dict() for i in Reccomandation.query.all()])

@app.route("/recommendations", methods=["GET", "POST"])
def recommendations():
    recommendations = Reccomandation.query.all()
    return render_template("recommandations.html", data=recommendations)

@app.route("/<int:event_id>", methods=["GET"])
def getEvent(event_id):
    event = Event.query.get(event_id)
    return render_template("single_event.html", event=event)
