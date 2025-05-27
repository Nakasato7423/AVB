export function getTypeColor(type) {
  const colors = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-400",
    fighting: "bg-orange-600",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-stone-500",
    ghost: "bg-violet-500",
    dragon: "bg-purple-700",
    steel: "bg-slate-500",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
  };
  return colors[type] || "bg-gray-400";
}