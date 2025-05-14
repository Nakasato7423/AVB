import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Detalhes() {
  const { nome } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavorito(favoritos.includes(nome));

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
      .then((res) => {
        setPokemon(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pokémon", error);
        setError(true);
        setLoading(false);
      });
  }, [nome]);

  const handleFavoritar = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let novos;

    if (favorito) {
      novos = favoritos.filter((item) => item !== nome);
    } else {
      novos = [...favoritos, nome];
    }

    localStorage.setItem("favoritos", JSON.stringify(novos));
    setFavorito(!favorito);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 py-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Pokémon não encontrado!</h2>
          <p className="text-gray-600 mb-6">
            O Pokémon que você está procurando não foi encontrado na Pokédex.
          </p>
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

return (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 flex items-center justify-center"> {/* Adicione flex e justify-center */}
    <div className="container mx-auto px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden"> {/* Reduzi para max-w-md */}
          {/* Cabeçalho com imagem de fundo */}
          <div className={`h-48 ${getTypeColor(pokemon.types[0].type.name)} bg-opacity-70 flex justify-center items-end`}>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default || 
                   pokemon.sprites.front_default}
              alt={pokemon.name}
              className="h-64 w-64 -mb-16 object-contain"
            />
          </div>

          {/* Conteúdo principal */}
          <div className="pt-20 px-6 pb-8">
            <div className="text-center mb-8">
              <span className="text-gray-500 font-medium text-lg">
                #{pokemon.id.toString().padStart(3, '0')}
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

              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <p className="text-gray-500">Altura</p>
                  <p className="font-bold text-lg">{pokemon.height / 10} m</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Peso</p>
                  <p className="font-bold text-lg">{pokemon.weight / 10} kg</p>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Estatísticas</h2>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize font-medium text-gray-700">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="font-bold">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-blue-500" 
                        style={{width: `${Math.min(100, stat.base_stat)}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Habilidades */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span 
                    key={ability.ability.name}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Botão de favorito */}
            <button
              onClick={handleFavoritar}
              className={`w-full py-3 px-6 rounded-full font-bold text-white transition-colors flex items-center justify-center gap-2 ${
                favorito 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {favorito ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Remover dos Favoritos
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Adicionar aos Favoritos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para cores de tipos (a mesma da Home)
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