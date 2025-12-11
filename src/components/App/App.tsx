import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Login from "../Login/Login"
import LoginProvider from "../../contexts/LoginContext";
import MenuPrincipal from "../MenuPrincipal";
import FormulaireAjout from "../FormulaireAjout";
import BarreNavigation from "../BarreNavigation";

function Modele() {
  return (
    <div>
      <BarreNavigation />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Modele />}>
            <Route index element={<MenuPrincipal />} />
            <Route path="/ajouter" element={<FormulaireAjout />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
