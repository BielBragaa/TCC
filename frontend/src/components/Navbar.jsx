import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "#f0f0f0", padding: "15px", marginBottom: "30px" }}>
      <Link to="/" style={{ marginRight: "20px" }}>🏠 Dashboard</Link>
      <Link to="/cadastro-veiculo" style={{ marginRight: "20px" }}>🚗 Cadastro de Veículo</Link>
      <Link to="/registro-entrega" style={{ marginRight: "20px" }}>📦 Registro de Entregas</Link>
      <Link to="/relatorios" style={{ marginRight: "20px" }}>📊 Relatórios</Link>
      <Link to="/comunidade" style={{ marginRight: "20px" }}>🧑‍🤝‍🧑 Comunidade</Link>
    </nav>
  );
};

export default Navbar;
