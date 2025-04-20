from typing import Literal
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from Directgpt.agent import getReccs
import requests

app = Flask(__name__)
CORS(app, resources={r"/movieRecs": {"origins": "http://localhost:5173"}})

@app.route('/movieRecs', methods=['POST'])
def ask_model() -> tuple[Response, Literal[400]] | tuple[Response, Literal[500]] | tuple[Response, Literal[200]]:
    input_data = request.get_json()
    if not input_data:
        return jsonify({"error": "Missing 'data' query parameter"}), 400
    try:
        input_data = request.get_json()
        if not input_data:
            return jsonify({"error": "Missing JSON data"}), 400
        response = getReccs(input_data)
        if not response:
            return jsonify({"error": "No response from model"}), 500
        return jsonify({"response": response}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/poster', methods=['POST'])
def getPoster():
    input_data = request.get_json()
# Run the server
if __name__ == '__main__':
    app.run(0)
