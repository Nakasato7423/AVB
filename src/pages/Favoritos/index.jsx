import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favs);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="text-center">Nenhum Pokémon favoritado ainda.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4">
          {favoritos.map((pokemon) => (
            <li
              key={pokemon.name}
              className="bg-white shadow-md rounded p-4 text-center"
            >
              <Link to={`/detalhes/${pokemon.id}`}>
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="mx-auto mb-2"
                />
                <p className="capitalize font-semibold">{pokemon.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
