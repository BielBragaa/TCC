import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { RegistrosContext } from "../contexts/RegistrosContext";

export default function RegistroEntregaDespesa() {
  const { registros, setRegistros } = useContext(RegistrosContext);

  const [formData, setFormData] = useState({
    tipo_rendimento: "",
    valor_unitario: 0,
    valor_diaria: 0,
    total_pacotes: 0,
    pacotes_entregues: 0,
    pacotes_nao_entregues: 0,
    categoria_despesa: "",
    descricao_outros: "",
    valor_despesa: 0
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRegistros([...registros, formData]);
    setFormData({
      tipo_rendimento: "",
      valor_unitario: 0,
      valor_diaria: 0,
      total_pacotes: 0,
      pacotes_entregues: 0,
      pacotes_nao_entregues: 0,
      categoria_despesa: "",
      descricao_outros: "",
      valor_despesa: 0
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Registro de Entregas e Despesas</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Tipo de Rendimento:</label><br />
          <select name="tipo_rendimento" value={formData.tipo_rendimento} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="unitario">Unitário</option>
            <option value="diaria">Diária</option>
          </select>
        </p>

        {formData.tipo_rendimento === "unitario" && (
          <p>
            <label>Valor Unitário:</label><br />
            <input type="number" name="valor_unitario" value={formData.valor_unitario} onChange={handleChange} />
          </p>
        )}
        {formData.tipo_rendimento === "diaria" && (
          <p>
            <label>Valor Diária:</label><br />
            <input type="number" name="valor_diaria" value={formData.valor_diaria} onChange={handleChange} />
          </p>
        )}

        <p>
          <label>Total de Pacotes:</label><br />
          <input type="number" name="total_pacotes" value={formData.total_pacotes} onChange={handleChange} />
        </p>
        <p>
          <label>Pacotes Entregues:</label><br />
          <input type="number" name="pacotes_entregues" value={formData.pacotes_entregues} onChange={handleChange} />
        </p>
        <p>
          <label>Pacotes Não Entregues:</label><br />
          <input type="number" name="pacotes_nao_entregues" value={formData.pacotes_nao_entregues} onChange={handleChange} />
        </p>

        <p>
          <label>Categoria da Despesa:</label><br />
          <input type="text" name="categoria_despesa" value={formData.categoria_despesa} onChange={handleChange} />
        </p>

        {formData.categoria_despesa.toLowerCase() === "outros" && (
          <p>
            <label>Descrição Outros:</label><br />
            <input type="text" name="descricao_outros" value={formData.descricao_outros} onChange={handleChange} />
          </p>
        )}

        <p>
          <label>Valor da Despesa:</label><br />
          <input type="number" name="valor_despesa" value={formData.valor_despesa} onChange={handleChange} />
        </p>

        <button type="submit">Salvar Registro</button>
      </form>
    </div>
  );
}
