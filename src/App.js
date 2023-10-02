import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
<<<<<<< HEAD
import SingleClinic from "./pages/SingleClinic/SingleClinic";
import Clinic from "./pages/Clinic/Clinic";
=======
import SingleClinic from './pages/SingleClinic/SingleClinic';
import Admin from './pages/Admin/Admin';
>>>>>>> 5a1c91e05c0feea2ef683f2408bdd8c4d8b586a0

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

<<<<<<< HEAD
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
=======
    return (
        <div className="App w-[100%] px-[10px] ">
            <Header />
            <Routes>
                <Route path='/' element={<ProductList />}/>
                 <Route path='clinic/:id' element={<SingleClinic/>} />


                <Route path={'form'} element={<Form />}/>
                <Route path={'admin'} element={<Admin />}/>
            </Routes>
        </div>
    );
>>>>>>> 5a1c91e05c0feea2ef683f2408bdd8c4d8b586a0
}

export default App;
