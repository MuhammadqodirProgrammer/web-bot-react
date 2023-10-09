import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import Form from "./components/Form/Form";
import SingleClinic from "./pages/SingleClinic/SingleClinic";
import Clinic from "./pages/Clinic/Clinic";
import Admin from "./pages/Admin/Admin";
import SingleService from "./pages/SingleService/SingleService";
import Doctor from "./pages/Doctor/Doctor";
import Patient from "./pages/Patient/Patient";

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App w-[100%]  mx-auto sm:w-[50%] px-[10px] ">
      <Header />
      <Routes>
        <Route path="/:patient_id" element={<Patient />} />
        <Route path="/:patient_id/clinic/:clinic_id" element={<SingleClinic />} />
        <Route path="/:patient_id/clinic/:clinic_id/service/:service_id" element={<SingleService />} />
        <Route path="clinic" element={<Clinic />} />
        {/* <Route path="doctor" element={<Doctor />} /> */}
        <Route path="doctor/:doctor_id" element={<Doctor />} />
        <Route path={"admin"} element={<Admin />} />

        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
