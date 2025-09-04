import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { RegistrosContext } from "../contexts/RegistrosContext";

const Relatorios = () => {
  const { registros } = useContext(RegistrosContext);

  const totalGanho = registros.reduce((acc, r) => {
    if (r.tipo_rendimento === "unitario") return acc + (r.valor_unitario || 0) * (r.pacotes_entregues || 0);
    if (r.tipo_rendimento === "diaria") return acc + (r.valor_diaria || 0);
    return acc;
  }, 0);

  const totalDespesa = registros.reduce((acc, r) => acc + (r.valor_despesa || 0), 0);
  const lucro = totalGanho - totalDespesa;

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Relatório Detalhado</h1>

      <h3>Resumo Geral</h3>
      <ul>
        <li>Total de Ganhos: R$ {totalGanho}</li>
        <li>Total de Despesas: R$ {totalDespesa}</li>
        <li><strong>Lucro: R$ {lucro}</strong></li>
      </ul>

      <h3>Registros</h3>
      <ul>
        {registros.length > 0 ? (
          registros.map((r, i) => (
            <li key={i}>
              Data: {r.data || "N/A"}, Tipo: {r.tipo_rendimento}, Total Pacotes: {r.total_pacotes}, Entregues: {r.pacotes_entregues}, Não Entregues: {r.pacotes_nao_entregues}, Valor Despesa: {r.valor_despesa}, Ganho: {(r.tipo_rendimento === "unitario" ? r.valor_unitario * r.pacotes_entregues : r.valor_diaria) || 0}
            </li>
          ))
        ) : (
          <li>Nenhum registro encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default Relatorios;
