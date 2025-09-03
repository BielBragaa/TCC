// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importa as páginas
import Dashboard from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";
import RegistroEntregaDespesa from "./pages/RegistroEntregaDespesa";
import CadastroVeiculo from "./pages/CadastroVeiculo";
import Comunidade from "./pages/Comunidade";

// importa a Navbar
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      {/* Navbar fixa em todas as páginas */}
      <Navbar />

      {/* Container principal para as páginas */}
      <div style={{ padding: "20px", marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/registro-entrega" element={<RegistroEntregaDespesa />} />
          <Route path="/cadastro-veiculo" element={<CadastroVeiculo />} />
          <Route path="/comunidade" element={<Comunidade />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
