import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import PriemPage from "./pages/PriemPage/PriemPage";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="WrapSide">
        <Sidebar />
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/priem" element={<PriemPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
