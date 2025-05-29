// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Favoritos from './pages/Favoritos';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-purple-700 tracking-wide">PokéApp</h1>
          <nav className="space-x-4 text-lg">
            <Link to="/" className="text-purple-700 hover:underline">Home</Link>
            <Link to="/favoritos" className="text-purple-700 hover:underline">Favoritos</Link>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </main>

        <footer className="bg-white text-center text-sm p-4 shadow-inner mt-6">
          <p className="text-gray-500">&copy; 2025 PokéApp. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}
