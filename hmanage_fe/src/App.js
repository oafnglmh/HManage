// App.js
import { Routes, Route } from "react-router-dom";
import AppContent from "../src/components/Auth/js/AppContent";
import HomePage from "./components/Home/components/home/js/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
