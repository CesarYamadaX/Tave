from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuración de MongoDB Atlas
mongodb_uri = os.getenv('MONGO_URI')
if not mongodb_uri:
    raise ValueError("No MONGO_URI found in environment variables")

print(f"Connecting to MongoDB with URI: {mongodb_uri}")  # Para debug

app.config["MONGO_URI"] = mongodb_uri
mongo = PyMongo(app)

@app.route('/')
def hello_world():
    return {'message': 'Hello, World!'}

@app.route('/test-db')
def test_db():
    try:
        # Intenta listar las colecciones para verificar la conexión
        collections = mongo.db.list_collection_names()
        return jsonify({
            "message": "Connected successfully to MongoDB!",
            "collections": list(collections)
        })
    except Exception as e:
        print(f"Database error: {str(e)}")  # Para debug
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print(f"Login attempt for user: {data.get('username')}")  # Para debug
        
        username = data.get('username')
        password = data.get('password')

        # Ejemplo de cómo usar MongoDB
        user = mongo.db.users.find_one({'username': username, 'password': password})
        
        if user:
            return jsonify({"message": "login success"})
        
        return jsonify({"message": "login failed"})
    except Exception as e:
        print(f"Login error: {str(e)}")  # Para debug
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
    