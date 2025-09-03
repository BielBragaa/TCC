// frontend/src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// buscar veículos
export async function getVeiculos() {
  const response = await api.get("/cadastro-veiculo/");
  return response.data;
}

// criar veículo
export async function createVeiculo(dados) {
  const response = await api.post("/cadastro-veiculo/", dados);
  return response.data;
}

// criar registro de entrega/despesa
export async function createRegistro(dados) {
  const response = await api.post("/registro-entrega/", dados);
  return response.data;
}

export default api;
