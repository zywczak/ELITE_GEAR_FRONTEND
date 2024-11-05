import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Products from './pages/Products';
import MotherboardPage from './pages/MotherboardPage';
import CPUPage from './pages/CPUPage';
import CoolerPage from './pages/CoolerPage';
import RamPage from './pages/RamPage';
import { isLoggedIn } from './utils/AuthUttils.';
import LogoutPage from './pages/LogoutPage';
import CartPage from './pages/CarttPage';
import OrdersPage from './pages/OrdersPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/:category" element={<Products />} />
          <Route path="/motherboard/:id" element={<MotherboardPage />} />
          <Route path="/cpu/:id" element={<CPUPage />} />
          <Route path="/ram/:id" element={<RamPage />} />
          <Route path="/coolers/:id" element={<CoolerPage />} />
          {isLoggedIn() && (
          <>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrdersPage />} />
          </>
        )}
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
