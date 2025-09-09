import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getPostagens, createPostagem, getAnuncios, createAnuncio } from "../api/api";

export default function Comunidade() {
  const [postagens, setPostagens] = useState([]);
  const [anuncios, setAnuncios] = useState([]);

  const [postData, setPostData] = useState({
    autor: "",
    titulo: "",
    conteudo: "",
  });

  const [anuncioData, setAnuncioData] = useState({
    modelo: "",
    ano: "",
    quilometragem: "",
    preco: "",
    localizacao: "",
    link_externo: "",
    foto: null,
  });

  // Carregar dados da API ao abrir a página
  useEffect(() => {
    async function carregarDados() {
      try {
        const p = await getPostagens();
        setPostagens(p);

        const a = await getAnuncios();
        setAnuncios(a);
      } catch (error) {
        console.error("Erro ao carregar dados da comunidade:", error);
      }
    }
    carregarDados();
  }, []);

  // Mudanças nos formulários
  const handlePostChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  const handleAnuncioChange = (e) =>
    setAnuncioData({ ...anuncioData, [e.target.name]: e.target.value });

  const handleFotoChange = (e) =>
    setAnuncioData({ ...anuncioData, foto: e.target.files[0] });

  // Enviar post para API
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const novo = await createPostagem(postData);
      setPostagens([novo, ...postagens]); // adiciona no topo
      setPostData({ autor: "", titulo: "", conteudo: "" });
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
    }
  };

  // Enviar anúncio para API
  const handleAnuncioSubmit = async (e) => {
    e.preventDefault();
    try {
      // Criar FormData para enviar foto
      const formData = new FormData();
      for (const key in anuncioData) {
        if (anuncioData[key] !== null) {
          formData.append(key, anuncioData[key]);
        }
      }
      const novo = await createAnuncio(formData); // certifique-se que createAnuncio suporta FormData
      setAnuncios([novo, ...anuncios]);
      setAnuncioData({
        modelo: "",
        ano: "",
        quilometragem: "",
        preco: "",
        localizacao: "",
        link_externo: "",
        foto: null,
      });
    } catch (error) {
      console.error("Erro ao criar anúncio:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Comunidade</h1>

      {/* Fórum */}
      <h2>Fórum - Compartilhe suas experiências</h2>
      <form onSubmit={handlePostSubmit}>
        <p>
          <label>Seu nome:</label>
          <br />
          <input
            type="text"
            name="autor"
            value={postData.autor}
            onChange={handlePostChange}
            required
          />
        </p>
        <p>
          <label>Título do post:</label>
          <br />
          <input
            type="text"
            name="titulo"
            value={postData.titulo}
            onChange={handlePostChange}
            required
          />
        </p>
        <p>
          <label>Conteúdo:</label>
          <br />
          <textarea
            name="conteudo"
            value={postData.conteudo}
            onChange={handlePostChange}
            rows="4"
            required
          />
        </p>
        <button type="submit">Publicar no fórum</button>
      </form>

      <hr />
      <h3>Postagens recentes</h3>
      <ul>
        {postagens.length > 0 ? (
          postagens.map((p) => (
            <li key={p.id}>
              <strong>{p.titulo}</strong> por {p.autor} em {p.data_criacao}
              <br />
              {p.conteudo}
            </li>
          ))
        ) : (
          <li>Nenhuma postagem encontrada.</li>
        )}
      </ul>

      <hr />
      {/* Anúncios */}
      <h2>Anúncios de Veículos</h2>
      <form onSubmit={handleAnuncioSubmit} encType="multipart/form-data">
        <p>
          <label>Modelo:</label>
          <br />
          <input
            type="text"
            name="modelo"
            value={anuncioData.modelo}
            onChange={handleAnuncioChange}
            required
          />
        </p>
        <p>
          <label>Ano:</label>
          <br />
          <input
            type="number"
            name="ano"
            value={anuncioData.ano}
            onChange={handleAnuncioChange}
            required
          />
        </p>
        <p>
          <label>Quilometragem:</label>
          <br />
          <input
            type="number"
            name="quilometragem"
            value={anuncioData.quilometragem}
            onChange={handleAnuncioChange}
            required
          />
        </p>
        <p>
          <label>Preço:</label>
          <br />
          <input
            type="number"
            step="0.01"
            name="preco"
            value={anuncioData.preco}
            onChange={handleAnuncioChange}
            required
          />
        </p>
        <p>
          <label>Localização:</label>
          <br />
          <input
            type="text"
            name="localizacao"
            value={anuncioData.localizacao}
            onChange={handleAnuncioChange}
            required
          />
        </p>
        <p>
          <label>Link externo:</label>
          <br />
          <input
            type="url"
            name="link_externo"
            value={anuncioData.link_externo}
            onChange={handleAnuncioChange}
          />
        </p>
        <p>
          <label>Foto:</label>
          <br />
          <input type="file" name="foto" onChange={handleFotoChange} />
        </p>
        <button type="submit">Publicar anúncio</button>
      </form>

      <hr />
      <h3>Anúncios recentes</h3>
      <ul>
        {anuncios.length > 0 ? (
          anuncios.map((a) => (
            <li key={a.id}>
              <strong>{a.modelo} - {a.ano}</strong><br />
              Km: {a.quilometragem}<br />
              Preço: R$ {a.preco}<br />
              Localização: {a.localizacao}<br />
              <a href={a.link_externo} target="_blank" rel="noreferrer">Ver anúncio</a><br />
              {a.foto && <img src={a.foto} alt="Foto do veículo" width="200"/>}
              <hr />
            </li>
          ))
        ) : (
          <li>Nenhum anúncio encontrado.</li>
        )}
      </ul>
    </div>
  );
}
