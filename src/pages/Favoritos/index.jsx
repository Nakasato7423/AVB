import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFavoritos } from "../../FavoritosContext";
import PokemonCard from "../../components/PokemonCard";
import EmptyState from "../../components/EmptyState";

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoritos.length > 0) {
      const promises = favoritos.map((nome) =>
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
  }, [favoritos]);

  if (loading) return <h1>Carregando...</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Meus Pokémon Favoritos
        </h1>

        {favoritos.length === 0 ? (
          <EmptyState
            icon={
              <svg className="h-16 w-16 mx-auto text-yellow-400 mb-4" /* ícone de aviso */ />
            }
            title="Nenhum Pokémon favoritado"
            message="Você ainda não adicionou nenhum Pokémon aos seus favoritos."
            action={
              <Link
                to="/"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Explorar Pokédex
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}