import React, { useState } from "react";

function App() {
  const [imagem, setImagem] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [confianca, setConfianca] = useState(null);
  const [carregando, setCarregando] = useState(false);

  
  const aoMudarImagem = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  
  const enviarParaIA = async () => {
    if (!imagem) {
      alert("Selecione uma imagem primeiro!");
      return;
    }

    setCarregando(true);
    setResultado(null);

    try {
      
      const resposta = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: imagem, 
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setResultado(dados.resultado);
        setConfianca((dados.confianca * 100).toFixed(2));
      } else {
        alert("Erro na API: " + dados.erro);
      }
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível conectar ao servidor Flask. O Terminal 1 está ligado?");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center", backgroundColor: "#1e1e1e", color: "#fff", minHeight: "100vh" }}>
      <h1>🤖 Detector de Veículos</h1>
      <p>Classifique imagens entre: Carro, Moto ou Bicicleta</p>

      <div style={{ margin: "30px 0" }}>
        <input type="file" accept="image/*" onChange={aoMudarImagem} style={{ fontSize: "16px" }} />
      </div>

      {imagem && (
        <div style={{ margin: "20px 0" }}>
          <img 
            src={URL.createObjectURL(imagem)} 
            alt="Preview" 
            style={{ maxWidth: "350px", borderRadius: "12px", border: "2px solid #555" }} 
          />
          <br />
          <button 
            onClick={enviarParaIA} 
            disabled={carregando}
            style={{ 
              padding: "12px 24px", 
              marginTop: "20px", 
              cursor: "pointer", 
              backgroundColor: "#007bff", 
              color: "#fff", 
              border: "none", 
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {carregando ? "Analisando imagem..." : "Verificar na IA"}
          </button>
        </div>
      )}

      {resultado && (
        <div style={{ marginTop: "30px", padding: "20px", background: "#2d2d2d", borderRadius: "8px", display: "inline-block", border: "1px solid #444" }}>
          <h2 style={{ margin: "0 0 10px 0" }}>Resultado: <span style={{ color: "#00cbff", textTransform: "uppercase" }}>{resultado}</span></h2>
          <h3 style={{ margin: "0", color: "#aaa" }}>Confiança: {confianca}%</h3>
        </div>
      )}
    </div>
  );
}

export default App;