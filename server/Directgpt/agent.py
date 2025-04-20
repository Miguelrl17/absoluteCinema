# from flask import Flask, request, jsonify, Response

import csv
import json
from google import genai
from dotenv import load_dotenv
import os
import pathlib
load_dotenv()
# Access the API key
GEMINI = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI)
pathToRead = pathlib.Path(pathlib.Path.cwd())


def getReccs(json):
    prompt = ""
    movies = ""
    for path in pathToRead.iterdir():
        print(path.name)
        if path.name == "reccPrompt.txt":
            with open(path, "r") as file:
                print(path)
                prompt = file.read()
        elif path.name == "movies_tmdb_popular.txt":
            with open(path, "r", encoding="utf-8") as file:
               movies = file.read()
    print(movies)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=f"{prompt} {json} here are the follwing movies to choose from{movies}")
    return response.text
