import { Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Players from "../routes/Players";
import Teams from "../routes/Teams";
import Switcher from "./arena/Switcher";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Players" element={<Players />} />
      <Route path="/Teams" element={<Teams />} />
      <Route path="/mode/:mode" element={<Switcher />} />
    </Routes>
  );
}
