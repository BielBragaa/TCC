import React, { useState } from "react";
import { createRegistro } from "../api/api";
import { Link } from "react-router-dom";

export default function RegistroEntregaDespesa() {
  const [formData, setFormData] = useState({
    tipo_rendimento: "",
    valor_unitario: "",
    valor_diaria: "",
    total_pacotes: "",
    pacotes_entregues: "",
    pacotes_nao_entregues: "",
    categoria_despesa: "",
    descricao_outros: "",
    valor_despesa: "",
  });

  const [resultado, setResultado] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await createRegistro(formData);
    setResultado(data); // Django retorna resumo
  }

  return (
    <div className="p-6">
      {/* Navbar */}
      <nav className="bg-gray-100 p-4 mb-6 flex gap-4">
        <Link to="/">🏠 Dashboard</Link>
        <Link to="/cadastro-veiculo">🚗 Cadastro de Veículo</Link>
        <Link to="/registro-entrega">📦 Registro de Entregas</Link>
        <Link to="/relatorios">📊 Relatórios</Link>
        <Link to="/comunidade">🧑‍🤝‍🧑 Comunidade</Link>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Registro de Entregas e Despesas</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo rendimento */}
        <select
          name="tipo_rendimento"
          value={formData.tipo_rendimento}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Selecione o tipo</option>
          <option value="unitario">Unitário</option>
          <option value="diaria">Diária</option>
        </select>

        {formData.tipo_rendimento === "unitario" && (
          <input
            type="number"
            name="valor_unitario"
            placeholder="Valor Unitário"
            value={formData.valor_unitario}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        {formData.tipo_rendimento === "diaria" && (
          <input
            type="number"
            name="valor_diaria"
            placeholder="Valor Diária"
            value={formData.valor_diaria}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        <input
          type="number"
          name="total_pacotes"
          placeholder="Total de Pacotes"
          value={formData.total_pacotes}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="pacotes_entregues"
          placeholder="Pacotes Entregues"
          value={formData.pacotes_entregues}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="pacotes_nao_entregues"
          placeholder="Pacotes Não Entregues"
          value={formData.pacotes_nao_entregues}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="categoria_despesa"
          value={formData.categoria_despesa}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Selecione categoria</option>
          <option value="combustivel">Combustível</option>
          <option value="manutencao">Manutenção</option>
          <option value="outros">Outros</option>
        </select>

        {formData.categoria_despesa === "outros" && (
          <input
            type="text"
            name="descricao_outros"
            placeholder="Descrição (Outros)"
            value={formData.descricao_outros}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        <input
          type="number"
          name="valor_despesa"
          placeholder="Valor da Despesa"
          value={formData.valor_despesa}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Salvar Registro
        </button>
      </form>

      {/* Resumo */}
      {resultado && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold">Resumo do Dia</h2>
          <p>Pacotes Entregues: {resultado.entregues}</p>
          <p>Pacotes Não Entregues: {resultado.nao_entregues}</p>
          <p>Ganho: R$ {resultado.ganho}</p>
          <p>Despesa: R$ {resultado.despesa}</p>
          <p>Lucro: R$ {resultado.lucro}</p>
        </div>
      )}
    </div>
  );
}
