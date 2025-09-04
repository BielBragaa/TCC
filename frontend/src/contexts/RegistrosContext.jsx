import React, { createContext, useState } from "react";

export const RegistrosContext = createContext();

export function RegistrosProvider({ children }) {
  const [registros, setRegistros] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [postagens, setPostagens] = useState([]);
  const [anuncios, setAnuncios] = useState([]);

  return (
    <RegistrosContext.Provider
      value={{ registros, setRegistros, veiculos, setVeiculos, postagens, setPostagens, anuncios, setAnuncios }}
    >
      {children}
    </RegistrosContext.Provider>
  );
}
