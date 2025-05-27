import { createContext, useContext, useEffect, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  // Carrega favoritos do localStorage ao iniciar
  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(salvos);
  }, []);

  // Salva favoritos no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (nome) => {
    setFavoritos((prev) =>
      prev.includes(nome) ? prev.filter((f) => f !== nome) : [...prev, nome]
    );
  };

  const isFavorito = (nome) => favoritos.includes(nome);
  const countFavoritos = () => favoritos.length;
  const clearFavoritos = () => setFavoritos([]);

  return (
    <FavoritosContext.Provider
      value={{ favoritos, toggleFavorito, isFavorito, countFavoritos, clearFavoritos }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}