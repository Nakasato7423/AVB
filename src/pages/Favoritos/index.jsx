import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favs);

    if (favs.length > 0) {
      const promises = favs.map((nome) => 
        axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
      );
      
      Promise.all(promises)
        .then((respostas) => {
          setPokemons(respostas.map((r) => r.data));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const removerFavorito = (nome) => {
    const novosFavoritos = favoritos.filter((item) => item !== nome);
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    setFavoritos(novosFavoritos);
    setPokemons(pokemons.filter((p) => p.name !== nome));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Meus Pokémon Favoritos
        </h1>

        {favoritos.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-yellow-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Nenhum Pokémon favoritado
            </h2>
            <p className="text-gray-500 mb-4">
              Você ainda não adicionou nenhum Pokémon aos seus favoritos.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Explorar Pokédex
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="bg-gradient-to-b from-blue-100 to-white p-4 relative">
                  <img
                    src={pokemon.sprites.other["official-artwork"].front_default || 
                         pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="mx-auto h-40 w-40 object-contain"
                  />
                  <button
                    onClick={() => removerFavorito(pokemon.name)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    title="Remover dos favoritos"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 text-center">
                  <span className="text-gray-500 font-medium">#{pokemon.id.toString().padStart(3, '0')}</span>
                  <h2 className="text-xl font-bold capitalize text-blue-600 mb-2">
                    {pokemon.name}
                  </h2>
                  <Link
                    to={`/detalhes/${pokemon.name}`}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded-full text-sm transition-colors"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}