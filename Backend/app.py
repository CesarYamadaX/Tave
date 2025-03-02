from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "hola mundo"

@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    print(data)
    
    username = data.get('username')
    password = data.get('password')

    if(username == "Carlos" and password == "123"):
        return jsonify({"message": "login success"})

    return jsonify({"message": "login failed"})

if __name__ == '__main__':
    app.run(debug=True)
    