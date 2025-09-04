import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Relatorios from "./pages/Relatorios";
import RegistroEntregaDespesa from "./pages/RegistroEntregaDespesa";
import CadastroVeiculo from "./pages/CadastroVeiculo";
import Comunidade from "./pages/Comunidade";

import { RegistrosProvider } from "./contexts/RegistrosContext";

const App = () => {
  return (
    <RegistrosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/registro-entrega" element={<RegistroEntregaDespesa />} />
          <Route path="/cadastro-veiculo" element={<CadastroVeiculo />} />
          <Route path="/comunidade" element={<Comunidade />} />
        </Routes>
      </Router>
    </RegistrosProvider>
  );
};

export default App;
