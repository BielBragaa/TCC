// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/dashboard/");
        setDados(res.data);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (!dados) return <p>Erro ao carregar dados.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h2>Resumo Rápido</h2>
      <ul>
        <li>Total de Veículos Cadastrados: {dados.total_veiculos}</li>
        <li>Total de Ganhos (últimos 7 dias): R$ {dados.total_ganho}</li>
        <li>Total de Despesas (últimos 7 dias): R$ {dados.total_despesa}</li>
        <li><strong>Lucro (últimos 7 dias): R$ {dados.lucro}</strong></li>
      </ul>

      <hr />

      <h2>Últimos Registros</h2>
      {dados.ultimos_registros.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Data</th>
              <th>Ganho</th>
              <th>Despesa</th>
            </tr>
          </thead>
          <tbody>
            {dados.ultimos_registros.map((registro, idx) => (
              <tr key={idx}>
                <td>{registro.data}</td>
                <td>R$ {registro.ganho}</td>
                <td>R$ {registro.despesa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum registro encontrado nos últimos dias.</p>
      )}

      <hr />
      <p>
        <a href="/relatorios">Ver relatório detalhado</a>
      </p>
    </div>
  );
};

export default Dashboard;
