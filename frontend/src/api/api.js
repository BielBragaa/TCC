import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});


// ================= VEÍCULOS =================
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


// ================= REGISTROS =================
// criar registro de entrega/despesa
export async function createRegistro(dados) {
  const response = await api.post("/registro-entrega/", dados);
  return response.data;
}


// ================= COMUNIDADE =================
// buscar postagens
export async function getPostagens() {
  const response = await api.get("/comunidade/api/postagens/");
  return response.data;
}

// criar postagem
export async function createPostagem(dados) {
  const response = await api.post("/comunidade/api/postagens/", dados);
  return response.data;
}

// buscar anúncios
export async function getAnuncios() {
  const response = await api.get("/comunidade/api/anuncios/");
  return response.data;
}

// criar anúncio
export async function createAnuncio(dados) {
  const response = await api.post("/comunidade/api/anuncios/", dados);
  return response.data;
}

export default api;
