import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import StepperPague from "./pages/StepperPague";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/stepper" className="text-blue-600 hover:underline">
          Stepper pasos
        </Link>
      </nav>



      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stepper" element={<StepperPague />} />
        {/* Ruta por defecto */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
