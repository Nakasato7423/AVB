import { Link } from "react-router-dom";
import { getTypeColor } from "../utils.js";

export default function PokemonCard({ pokemon }) {
  return (
    <Link
      to={`/detalhes/${pokemon.name}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-56"
    >
      <div className="bg-gradient-to-b from-blue-100 to-white p-4">
        <img
          src={
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="mx-auto h-40 w-40 object-contain"
        />
      </div>
      <div className="p-4 text-center">
        <span className="text-gray-500 font-medium">
          #{pokemon.id.toString().padStart(3, "0")}
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
  );
}