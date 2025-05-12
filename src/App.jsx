import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Favoritos from "./pages/Favoritos";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 text-gray-800">
        <nav className="bg-indigo-600 text-white p-4 flex justify-center gap-6 text-lg font-semibold shadow-md">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/favoritos" className="hover:text-yellow-300">Favoritos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/detalhes/:nome" element={<Detalhes />} />
        </Routes>
      </div>
    </Router>
  );
}
