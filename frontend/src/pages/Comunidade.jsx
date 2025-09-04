import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { RegistrosContext } from "../contexts/RegistrosContext";

export default function Comunidade() {
  const { postagens, setPostagens, anuncios, setAnuncios } = useContext(RegistrosContext);

  const [postData, setPostData] = useState({ autor: "", titulo: "", conteudo: "" });
  const [anuncioData, setAnuncioData] = useState({
    modelo: "", ano: "", quilometragem: "", preco: "", localizacao: "", link_externo: "", foto: null
  });

  const handlePostChange = e => setPostData({ ...postData, [e.target.name]: e.target.value });
  const handleAnuncioChange = e => {
    const { name, value, files } = e.target;
    setAnuncioData({ ...anuncioData, [name]: files ? files[0] : value });
  };

  const handlePostSubmit = e => {
    e.preventDefault();
    setPostagens([...postagens, { ...postData, data_criacao: new Date() }]);
    setPostData({ autor: "", titulo: "", conteudo: "" });
  };

  const handleAnuncioSubmit = e => {
    e.preventDefault();
    setAnuncios([...anuncios, anuncioData]);
    setAnuncioData({ modelo: "", ano: "", quilometragem: "", preco: "", localizacao: "", link_externo: "", foto: null });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h1>Comunidade</h1>

      <h2>Fórum - Compartilhe suas experiências</h2>
      <form onSubmit={handlePostSubmit}>
        <p>
          <label>Seu nome:</label><br />
          <input type="text" name="autor" value={postData.autor} onChange={handlePostChange} required />
        </p>
        <p>
          <label>Título do post:</label><br />
          <input type="text" name="titulo" value={postData.titulo} onChange={handlePostChange} required />
        </p>
        <p>
          <label>Conteúdo:</label><br />
          <textarea name="conteudo" value={postData.conteudo} onChange={handlePostChange} rows="4" required />
        </p>
        <button type="submit">Publicar no fórum</button>
      </form>

      <hr />
      <h3>Postagens recentes</h3>
      <ul>
        {postagens.length > 0 ? postagens.map((p, i) => (
          <li key={i}><strong>{p.titulo}</strong> por {p.autor} em {p.data_criacao.toLocaleString()}<br />{p.conteudo}</li>
        )) : <li>Nenhuma postagem encontrada.</li>}
      </ul>

      <hr />
      <h2>Anúncios de Veículos</h2>
      <form onSubmit={handleAnuncioSubmit}>
        <p><label>Modelo:</label><br /><input type="text" name="modelo" value={anuncioData.modelo} onChange={handleAnuncioChange} required /></p>
        <p><label>Ano:</label><br /><input type="number" name="ano" value={anuncioData.ano} onChange={handleAnuncioChange} required /></p>
        <p><label>Quilometragem:</label><br /><input type="number" name="quilometragem" value={anuncioData.quilometragem} onChange={handleAnuncioChange} required /></p>
        <p><label>Preço:</label><br /><input type="number" name="preco" value={anuncioData.preco} onChange={handleAnuncioChange} required /></p>
        <p><label>Localização:</label><br /><input type="text" name="localizacao" value={anuncioData.localizacao} onChange={handleAnuncioChange} required /></p>
        <p><label>Link externo:</label><br /><input type="url" name="link_externo" value={anuncioData.link_externo} onChange={handleAnuncioChange} required /></p>
        <p><label>Foto do veículo:</label><br /><input type="file" name="foto" onChange={handleAnuncioChange} /></p>
        <button type="submit">Publicar anúncio</button>
      </form>

      <hr />
      <h3>Anúncios recentes</h3>
      <ul>
        {anuncios.length > 0 ? anuncios.map((a, i) => (
          <li key={i}>
            <strong>{a.modelo} - {a.ano}</strong><br />
            Km: {a.quilometragem}<br />
            Preço: R$ {a.preco}<br />
            Localização: {a.localizacao}<br />
            <a href={a.link_externo} target="_blank">Ver anúncio</a><br />
            {a.foto && <img src={URL.createObjectURL(a.foto)} alt="Foto do veículo" width="200" />}
            <hr />
          </li>
        )) : <li>Nenhum anúncio encontrado.</li>}
      </ul>
    </div>
  );
}
