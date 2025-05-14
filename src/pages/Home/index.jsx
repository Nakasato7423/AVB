import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => {
        const lista = res.data.results;
        const promises = lista.map((poke) => axios.get(poke.url));
        Promise.all(promises).then((respostas) => {
          const dados = respostas.map((r) => r.data);
          setPokemons(dados);
          setLoading(false);
        });
      })
      .catch(() => setLoading(false));
  }, []);

  const filtrados = pokemons.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase())
  );

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
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
            <span className="text-yellow-400">Poké</span>dex
          </h1>
          
          {/* Barra de pesquisa */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Pesquisar Pokémon..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full p-4 pl-12 rounded-full border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-md"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Lista de Pokémon */}
        {filtrados.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              Nenhum Pokémon encontrado
            </h2>
            <p className="text-gray-500 mt-2">
              Tente buscar por outro nome
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filtrados.map((pokemon) => (
                <Link
                  to={`/detalhes/${pokemon.name}`}
                  key={pokemon.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-56"
                >
                  <div className="bg-gradient-to-b from-blue-100 to-white p-4">
                    <img
                      src={pokemon.sprites.other["official-artwork"].front_default || 
                           pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="mx-auto h-40 w-40 object-contain"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-gray-500 font-medium">
                      #{pokemon.id.toString().padStart(3, '0')}
                    </span>
                    <h2 className="text-xl font-bold capitalize text-blue-600">
                      {pokemon.name}
                    </h2>
                    <div className="flex justify-center gap-2 mt-2">
                      {pokemon.types.map((type) => (
                        <span 
                          key={type.type.name}
                          className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(type.type.name)}`}
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Função auxiliar para cores de tipos
function getTypeColor(type) {
  const colors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-400';
}