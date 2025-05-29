import { createContext, useContext, useEffect, useState } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const armazenado = localStorage.getItem("favoritos");
    return armazenado ? JSON.parse(armazenado) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function toggleFavorito(nome) {
    setFavoritos((prev) =>
      prev.includes(nome)
        ? prev.filter((f) => f !== nome)
        : [...prev, nome]
    );
  }

  function isFavorito(nome) {
    return favoritos.includes(nome);
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}
