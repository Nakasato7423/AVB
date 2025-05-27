import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Favoritos from "./pages/Favoritos";
import { FavoritosProvider } from "./FavoritosContext";

export default function App() {
  return (
    <FavoritosProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
          <nav className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-6 text-lg font-bold">
              <Link to="/" className="hover:text-blue-200 transition-colors flex items-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="Pokéball"
                  className="w-6 h-6"
                />
                Home
              </Link>
              <Link to="/favoritos" className="hover:text-blue-200 transition-colors flex items-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png"
                  alt="Favoritos"
                  className="w-6 h-6"
                />
                Favoritos
              </Link>
            </div>
          </nav>

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/detalhes/:nome" element={<Detalhes />} />
            </Routes>
          </main>

          <footer className="bg-blue-500 text-white text-center p-4 mt-8">
            <p>© 2023 Pokédex - Todos os direitos reservados</p>
          </footer>
        </div>
      </Router>
    </FavoritosProvider>
  );
}
