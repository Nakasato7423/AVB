import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => {
        const promises = res.data.results.map((poke) => axios.get(poke.url));
        Promise.all(promises).then((respostas) => {
          setPokemons(respostas.map((r) => r.data));
          setLoading(false);
        });
      })
      .catch(() => setLoading(false));
  }, []);

  const filtrados = pokemons.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) return <h1>Carregando...</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
            <span className="text-yellow-400">Poké</span>dex
          </h1>
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Pesquisar Pokémon..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-4 pl-12 rounded-full border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
            />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <EmptyState
            title="Nenhum Pokémon encontrado"
            message="Tente buscar por outro nome."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtrados.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
