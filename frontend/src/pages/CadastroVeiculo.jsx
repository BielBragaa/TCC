import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { RegistrosContext } from "../contexts/RegistrosContext";

export default function CadastroVeiculo() {
  const { veiculos, setVeiculos } = useContext(RegistrosContext);
  const [formData, setFormData] = useState({
    modelo: "",
    placa: "",
    categoria: ""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setVeiculos([...veiculos, formData]);
    setFormData({ modelo: "", placa: "", categoria: "" });
  }

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Cadastro de Veículo</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Modelo:</label><br />
          <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
        </p>
        <p>
          <label>Placa:</label><br />
          <input type="text" name="placa" value={formData.placa} onChange={handleChange} required />
        </p>
        <p>
          <label>Categoria:</label><br />
          <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
        </p>
        <button type="submit">Salvar</button>
      </form>

      <hr />
      <h2>Veículos Cadastrados</h2>
      <ul>
        {veiculos.length > 0 ? (
          veiculos.map((v, i) => (
            <li key={i}>{v.modelo} - {v.placa} - {v.categoria}</li>
          ))
        ) : (
          <li>Nenhum veículo cadastrado ainda.</li>
        )}
      </ul>
    </div>
  );
}
