import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import NovoRelatorio from "../pages/NovoRelatorio/NovoRelatorio";
import Instituicoes from "../pages/Instituicoes/Instituicoes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/novo-relatorio"
          element={<NovoRelatorio />}
        />

        <Route
          path="/instituicoes"
          element={<Instituicoes />}
        />
      </Routes>
    </BrowserRouter>
  );
}