# 🚗 Detector de Veículos - Inteligência Artificial (CNN)

Este projeto consiste em uma aplicação web full-stack que utiliza uma Rede Neural Convolucional (CNN) para classificar imagens de três categorias de veículos: **Carros**, **Motos** e **Bicicletas**. 

O modelo de Inteligência Artificial foi desenvolvido e treinado utilizando o TensorFlow/Keras no Google Colab e integrado a uma API em Flask no Back-end, com uma interface interativa no Front-end.

---

## 🛠️ Tecnologias Utilizadas

- **Inteligência Artificial:** Python, TensorFlow, Keras, NumPy
- **Back-end:** Flask, Flask-CORS
- **Front-end:** React / Vite (HTML5, CSS3, JavaScript)
- **Ambiente de Treinamento:** Google Colab

---

## 📐 Estrutura do Projeto

O repositório está organizado da seguinte forma:
- `/backend`: Contém a API Flask (`app.py`) e o modelo treinado salvo em formato H5 (`modelo_ia.h5`).
- `/frontend`: Interface interativa onde o usuário faz o upload da imagem e visualiza o resultado da predição.
- `train.py` (ou o arquivo `.ipynb` do Colab): Script com o pipeline de treinamento da rede neural.

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
Certifique-se de ter o Python e o Node.js instalados na sua máquina.

### 2. Configurando o Back-end (Flask)
Abra o terminal na pasta `/backend` e execute os comandos:
```bash
# Instalar as dependências necessárias
pip install tensorflow flask flask-cors numpy

# Iniciar o servidor
python app.py
