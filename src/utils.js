export function getTypeColor(type) {
  const colors = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    bug: "bg-lime-500",
    normal: "bg-gray-400",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    fairy: "bg-pink-400",
    fighting: "bg-orange-700",
    psychic: "bg-pink-500",
    rock: "bg-yellow-600",
    ghost: "bg-indigo-500",
    ice: "bg-blue-200",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    flying: "bg-cyan-300",
  };

  return colors[type] || "bg-gray-300";
}
