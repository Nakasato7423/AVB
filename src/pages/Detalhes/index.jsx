import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detalhes() {
  const { nome } = useParams(); // O parâmetro 'nome' será utilizado na URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    // Verifica se o Pokémon já está na lista de favoritos
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const favoritoStatus = favoritos.includes(nome);
    setFavorito(favoritoStatus);

    // Faz a requisição à API para buscar os detalhes do Pokémon
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
      .then((res) => {
        setPokemon(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pokémon", error);
        setLoading(false);
      });
  }, [nome]);

  const handleFavoritar = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favorito) {
      // Se já for favorito, remove da lista
      setFavorito(false);
      const novosFavoritos = favoritos.filter((item) => item !== nome);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    } else {
      // Caso contrário, adiciona à lista
      setFavorito(true);
      favoritos.push(nome);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <span className="text-2xl text-gray-700">Carregando...</span>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10">
        <span className="text-2xl text-red-600">Pokémon não encontrado.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 capitalize">{pokemon.name}</h1>
        <div className="text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto mb-6 w-48 h-48"
          />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Detalhes</h2>
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
            <p><strong>Habilidades:</strong></p>
            <ul className="list-disc ml-6">
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
            <button
              onClick={handleFavoritar}
              className={`mt-6 w-full py-2 px-4 rounded-md ${
                favorito ? "bg-red-600" : "bg-blue-600"
              } text-white font-bold hover:bg-opacity-80 transition`}
            >
              {favorito ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}