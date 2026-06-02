import { useState } from "react";

function App() {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultado, setResultado] = useState("");

  const lidarComImagem = (e) => {
    const arquivo = e.target.files[0];
    setImagem(arquivo);
    setPreview(URL.createObjectURL(arquivo));
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

      <button style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Classificar Imagem
      </button>

      {resultado && <h2 style={{ marginTop: "20px", color: "#007bff" }}>{resultado}</h2>}
    </div>
  );
}

export default App;