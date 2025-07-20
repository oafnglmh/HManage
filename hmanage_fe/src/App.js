import { Routes, Route } from "react-router-dom";
import AppContent from "../src/components/Auth/js/AppContent";
import HomePage from "./components/Home/components/home/js/HomePage";
import QuestionSetList from "./components/Home/components/Question/js/QuestionSetList";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/js/ProtectedRoute"
function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<AppContent />} />


    //   <Route path="/" element={<HomePage />}>
    //     <Route path="home" element={<div>Trang chủ</div>} />
    //     <Route path="questions" element={<QuestionSetList />} />
    //   </Route>
    // </Routes>

    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />}>
            <Route path="home" element={<div>Trang chủ</div>} />
            <Route path="questions" element={<QuestionSetList />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
