from typing import Literal
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import urllib3
from Directgpt.agent import getReccs
import json
from dotenv import load_dotenv
app = Flask(__name__)

load_dotenv()

import os
GEMINI = os.getenv("POSTER_KEY")
CORS(app, resources={r"/movieRecs": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/poster": {"origins": "http://localhost:5173"}})

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
def getPoster() -> tuple[Response, Literal[400]] | tuple[Response, Literal[500]] | tuple[Response, Literal[200]]:
    http = urllib3.PoolManager()
    api_key = "967b6f7d"
    try:
        processDict = request.get_json()
        title = processDict["movie_name"]
        year = processDict["movie_year"]
        url = f"https://www.omdbapi.com/?t={title}&y={year}&apikey={api_key}"
        response = http.request("GET", url)  # Use GET for fetching data
        if response.status == 200:
            data = json.loads(response.data.decode('utf-8'))
            if data.get("Poster") and data.get("Response") == "True":
                return jsonify({"posterUrl": data["Poster"]}), 200
            elif data.get("Response") == "False":
                return jsonify({"error": data.get("Error", "Movie not found")}), 404
            else:
                return jsonify({"error": "Invalid response format from OMDB API"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# Run the server
if __name__ == '__main__':
    app.run(0)
