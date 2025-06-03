import { useFavoritos } from "../../FavoritosContext";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await Promise.all(
        favoritos.map((nome) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`).then((res) => ({
            name: res.data.name,
            image: res.data.sprites.front_default,
            types: res.data.types.map((t) => t.type.name),
          }))
        )
      );
      setPokemons(data);
    }

    if (favoritos.length > 0) fetchData();
    else setPokemons([]);
  }, [favoritos]);

  if (pokemons.length === 0)
    return <p className="text-center text-gray-500">Nenhum favorito ainda!</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <PokemonCard key={p.name} {...p} />
      ))}
    </div>
  );
}
