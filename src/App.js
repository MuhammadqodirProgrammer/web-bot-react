import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import Form from "./components/Form/Form";
import SingleClinic from "./pages/SingleClinic/SingleClinic";
import Clinic from "./pages/Clinic/Clinic";
import Admin from "./pages/Admin/Admin";
import ClinictList from "./components/ClinictList/ClinictList";
import SingleService from "./pages/SingleService/SingleService";

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App w-[100%] px-[10px] ">
      <Header />
      <Routes>
        <Route path="/" element={<ClinictList />} />
        <Route path="clinic/:clinic_id" element={<SingleClinic />} />
        <Route path="clinic/:id/service/:service_id" element={<SingleService />} />
        <Route path="clinic" element={<Clinic />} />
        <Route path={"admin"} element={<Admin />} />

        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
