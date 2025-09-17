import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import MainPage from "./pages/MainPage";
import RecommendedProductsPage from "./pages/RecommendedProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/recommended-products" element={<RecommendedProductsPage />} />
    </Routes>
  );
}

export default App;
