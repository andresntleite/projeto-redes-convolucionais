import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app)

MODEL_PATH = "modelo_ia.h5"


if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)
    print("🤖 Modelo de IA de 3 classes carregado com sucesso pelo Felipe!")
else:
    model = None
    print("⚠️ Atenção: Arquivo modelo_ia.h5 não foi encontrado.")


NOMES_CLASSES = ['bicicleta', 'carro', 'moto']

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "API rodando. IA pronta para classificar Carro, Moto e Bicicleta."})

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"erro": "O modelo de IA não está carregado no servidor"}), 500

    if "image" not in request.files:
        return jsonify({"erro": "Nenhuma imagem foi enviada"}), 400
    
    arquivo_imagem = request.files["image"]
    
    if arquivo_imagem.filename == "":
        return jsonify({"erro": "Arquivo de imagem inválido"}), 400

    
    caminho_temporario = os.path.join(arquivo_imagem.filename)
    arquivo_imagem.save(caminho_temporario)

    try:
        
        img = image.load_img(caminho_temporario, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) 

        
        previsoes = model.predict(img_array)
        
        
        indice_resultado = np.argmax(previsoes[0])
        resultado_final = NOMES_CLASSES[indice_resultado]
        confianca_final = float(previsoes[0][indice_resultado])

       
        os.remove(caminho_temporario)

        return jsonify({
            "resultado": resultado_final,
            "confianca": confianca_final
        })

    except Exception as e:
        if os.path.exists(caminho_temporario):
            os.remove(caminho_temporario)
        return jsonify({"erro": f"Erro ao processar imagem: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)