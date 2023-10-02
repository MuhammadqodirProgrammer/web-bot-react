import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Outlet, Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import SingleClinic from './pages/SingleClinic/SingleClinic';

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App bg-red-600  ">
            <Header />
            <Routes>
                <Route path='/' element={<ProductList />}/>
                 <Route path='clinic/:id' element={<SingleClinic/>} />


                <Route path={'form'} element={<Form />}/>
            </Routes>
        </div>
    );
}

export default App;
