// frontend/src/pages/CadastroVeiculo.jsx
import React, { useState } from "react";

export default function CadastroVeiculo() {
  // Estado dos inputs
  const [formData, setFormData] = useState({
    modelo: "",
    placa: "",
    categoria: "",
  });

  // Atualiza os valores dos inputs
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Simula envio do formulário
  function handleSubmit(e) {
    e.preventDefault();
    alert(`Veículo salvo:\nModelo: ${formData.modelo}\nPlaca: ${formData.placa}\nCategoria: ${formData.categoria}`);
    setFormData({ modelo: "", placa: "", categoria: "" });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cadastro de Veículo</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={formData.modelo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={formData.placa}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        />
        <button type="submit">Salvar</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <h2>Valores atuais do formulário:</h2>
        <p>Modelo: {formData.modelo}</p>
        <p>Placa: {formData.placa}</p>
        <p>Categoria: {formData.categoria}</p>
      </div>
    </div>
  );
}
