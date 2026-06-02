import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "API do Frankyllen rodando com sucesso"})

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"erro": "Nenhuma imagem foi enviada"}), 400
    
    arquivo_imagem = request.files["image"]
    
    if arquivo_imagem.filename == "":
        return jsonify({"erro": "Arquivo de imagem inválido"}), 400


    caminho_arquivo = os.path.join(UPLOAD_FOLDER, arquivo_imagem.filename)
    arquivo_imagem.save(caminho_arquivo)


    return jsonify({
        "resultado": "Carro",
        "confianca": 0.95
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)