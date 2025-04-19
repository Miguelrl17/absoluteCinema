from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from Directgpt.agent import getReccs

app = Flask(__name__)

@app.route('/reccs', methods=['GET'])
def ask_model():
    #input_data = request.args.get('data')
    #if not input_data:
        #return jsonify({"error": "Missing 'data' query parameter"}), 400
    try:
        input_data ={"Age":18, "Rating": "G", "sensors":"strobing lights","genere": "action"}
        response = getReccs(input_data)
        if not response:
            return jsonify({"error": "No response from model"}), 500
        return jsonify({"response": response}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
