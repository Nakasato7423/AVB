import { Link } from "react-router-dom";
import { getTypeColor } from "../utils.js";

export default function PokemonCard({ name, image, types }) {
  return (
    <Link to={`/detalhes/${name}`} className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center">
      <img src={image} alt={name} className="h-32 mx-auto mb-2" />
      <h2 className="text-lg font-bold capitalize text-blue-600">{name}</h2>
      <div className="flex justify-center gap-2 mt-2">
        {types.map((type) => (
          <span key={type} className={`text-xs px-2 py-1 rounded-full text-white ${getTypeColor(type)}`}>
            {type}
          </span>
        ))}
      </div>
    </Link>
  );
}

