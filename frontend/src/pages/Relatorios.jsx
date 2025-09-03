// frontend/src/pages/Relatorios.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

const Relatorios = () => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const res = await api.get("/relatorios/", {
          headers: { Accept: "application/json" },
        });
        setDados(res.data);
      } catch (err) {
        console.error("Erro ao carregar relatórios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatorios();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (!dados) return <p>Erro ao carregar relatórios.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Relatório Detalhado - Últimos 7 Dias</h1>
      <p>De: {dados.data_inicio} até {dados.data_fim}</p>

      <h3>Resumo Geral</h3>
      <ul>
        <li>Total de Ganhos: R$ {dados.total_ganho}</li>
        <li>Total de Despesas: R$ {dados.total_despesa}</li>
        <li><strong>Lucro Total: R$ {dados.lucro}</strong></li>
      </ul>

      <h3>Registros</h3>
      {dados.registros.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Data</th>
              <th>Ganho</th>
              <th>Despesa</th>
            </tr>
          </thead>
          <tbody>
            {dados.registros.map((registro, idx) => (
              <tr key={idx}>
                <td>{registro.data}</td>
                <td>R$ {registro.ganho}</td>
                <td>R$ {registro.despesa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum registro disponível.</p>
      )}

      <p>
        <a href="/">Voltar para o Dashboard</a>
      </p>
    </div>
  );
};

export default Relatorios;
