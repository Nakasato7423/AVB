import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    // Busca os 30 primeiros pokemons
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((res) => {
        const lista = res.data.results;
        const promises = lista.map((poke) => axios.get(poke.url));
        Promise.all(promises).then((respostas) => {
          const dados = respostas.map((r) => r.data);
          setPokemons(dados);
        });
      });
  }, []);

  const filtrados = pokemons.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

        <input
          type="text"
          placeholder="Pesquisar Pokémon..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full mb-8 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtrados.map((pokemon) => (
            <Link
              to={`/detalhes/${pokemon.name}`}
              key={pokemon.id}
              className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-all"
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto mb-2 w-24 h-24"
              />
              <h2 className="text-xl font-semibold capitalize">
                {pokemon.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
