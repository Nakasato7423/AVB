import { useEffect, useState } from "react";
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700">Carregando...</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
            <span className="text-yellow-400">Poké</span>dex
          </h1>
          <input
            type="text"
            placeholder="Pesquisar Pokémon..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full max-w-md mx-auto p-4 pl-12 rounded-full border-2 border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md"
          />
        </header>

        {filtrados.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            <h2 className="text-2xl font-semibold mb-2">Nenhum Pokémon encontrado</h2>
            <p>Tente buscar por outro nome.</p>
          </div>
        ) : (
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtrados.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </main>
        )}
      </div>
    </div>
  );
}
