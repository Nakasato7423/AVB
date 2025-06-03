import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
      const promises = response.data.results.map((p) =>
        axios.get(p.url).then((res) => ({
          name: res.data.name,
          image: res.data.sprites.front_default,
          types: res.data.types.map((t) => t.type.name),
        }))
      );
      const data = await Promise.all(promises);
      setPokemons(data);
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <PokemonCard key={p.name} {...p} />
      ))}
    </div>
  );
}
