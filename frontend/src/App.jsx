import { useState } from "react";
import axios from "axios";

function App() {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultado, setResultado] = useState("");
  const [carregando, setCarregando] = useState(false);

  const lidarComImagem = (e) => {
    const arquivo = e.target.files[0];
    setImagem(arquivo);
    setPreview(URL.createObjectURL(arquivo));
    setResultado("");
  };

  const enviarImagem = async () => {
    if (!imagem) return alert("Por favor, selecione uma imagem primeiro!");
    
    setCarregando(true);
    const formData = new FormData();
    formData.append("image", imagem);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (response.data.resultado === "Objeto desconhecido") {
        setResultado(`Resultado: ${response.data.resultado}`);
      } else {
        setResultado(`Resultado: ${response.data.resultado} (${(response.data.confianca * 100).toFixed(2)}%)`);
      }
    } catch (error) {
      console.error(error);
      setResultado("Erro ao conectar com o servidor do Back-end.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Classificador de Veículos (CNN)</h1>
      <p>Envie uma foto de Carro, Moto ou Bicicleta</p>
      
      <div style={{ margin: "20px 0" }}>
        <input type="file" accept="image/*" onChange={lidarComImagem} />
      </div>

      {preview && (
        <div style={{ margin: "20px 0" }}>
          <img src={preview} alt="Preview" style={{ maxWidth: "300px", borderRadius: "8px" }} />
        </div>
      )}

      <button 
        onClick={enviarImagem} 
        disabled={carregando}
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        {carregando ? "Classificando..." : "Classificar Imagem"}
      </button>

      {resultado && <h2 style={{ marginTop: "20px", color: "#007bff" }}>{resultado}</h2>}
    </div>
  );
}

export default App;