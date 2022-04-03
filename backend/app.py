import os
import random
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime

application = Flask(__name__)

application.config["MONGO_URI"] = 'mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE'] + '?authSource=admin'
mongo = PyMongo(application)
db = mongo.db

@application.route('/api/ping')
def ping():
    '''Registers in a database table the time and date of the “ping” request'''
    item = {
        'ping_time': datetime.now()
    }
    db.apidata.insert_one(item)
    return jsonify(
                   status=True,
                   data='OK'
               ), 200

@application.route('/api/calculator', methods=['POST'])
def calculator():
    '''Returns the some of two given values'''
    data = request.get_json(force=True)
    _choice = random.choice([data['x'], data['y']])
    return jsonify(
        status=True,
        data=_choice
    ), 200

@application.route('/api/pings')
def pings():
    '''Returns the list of saved pings'''
    _pings = db.apidata.find()
    item = {}
    data = []
    for ping in _pings:
        item = {
            'id': str(ping['_id']),
            'ping_time': ping['ping_time']
        }
        data.append(item)

    return jsonify(
        status=True,
        data=data
    )


if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", True)
    ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
    application.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)

