from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "API do Frankyllen rodando com sucesso"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)