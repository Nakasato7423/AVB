import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useFavoritos } from "../../FavoritosContext";
import { getTypeColor } from "../../utils.js";

export default function Detalhes() {
  const { nome } = useParams();
  const { isFavorito, toggleFavorito } = useFavoritos();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
      .then((res) => {
        setPokemon(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [nome]);

  const handleFavoritar = () => {
    toggleFavorito(nome);
    toast.success(
      isFavorito(nome) ? "Removido dos favoritos!" : "Adicionado aos favoritos!"
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error || !pokemon) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Cabeçalho com imagem */}
          <div className={`h-48 ${getTypeColor(pokemon.types[0].type.name)} bg-opacity-70 flex justify-center items-end`}>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="h-64 w-64 -mb-16 object-contain"
            />
          </div>

          {/* Corpo */}
          <div className="pt-20 px-6 pb-8">
            {/* Nome, ID e Tipos */}
            <div className="text-center mb-8">
              <span className="text-gray-500 font-medium text-lg">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
              <h1 className="text-4xl font-bold capitalize text-blue-600 mb-2">
                {pokemon.name}
              </h1>
              <div className="flex justify-center gap-3 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getTypeColor(type.type.name)}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Botão de Favoritar */}
            <button
              onClick={handleFavoritar}
              className={`w-full py-3 px-6 rounded-full font-bold text-white transition-colors flex items-center justify-center gap-2 ${
                isFavorito(nome) ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isFavorito(nome) ? "❤️ Remover dos Favoritos" : "♡ Adicionar aos Favoritos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Pokémon não encontrado!</h2>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          Voltar para a Pokédex
        </Link>
      </div>
    </div>
  );
}