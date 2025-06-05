import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Pokémon não encontrado!</h2>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          Voltar para a Pokédex
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
