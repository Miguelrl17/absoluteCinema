# from flask import Flask, request, jsonify, Response

from google import genai
from dotenv import load_dotenv
import os
load_dotenv()

# Access the API key
GEMINI = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key= GEMINI)
global reccPrompt
import json

with open(r"C:\Users\migue\OneDrive\Desktop\absoluteCinema\server\Directgpt\reccPrompt.txt", "r") as file:
    prompt = file.read()


def getReccs(json):
    print(prompt)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents= f"{prompt} {json}")
    return response.text
