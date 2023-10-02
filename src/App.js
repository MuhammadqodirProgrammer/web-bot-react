import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import SingleClinic from "./pages/SingleClinic/SingleClinic";
import Clinic from "./pages/Clinic/Clinic";

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App w-[100%] px-[10px] ">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="clinic/:id" element={<SingleClinic />} />
        <Route path="clinic" element={<Clinic />} />
        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
