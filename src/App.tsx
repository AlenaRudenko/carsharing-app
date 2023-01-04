import "./App.css";
import { NavState } from "./context/NavState";
import { MainContent } from "./pages/main-page/MainContent";

import { Route, Routes } from "react-router-dom";
import { Order } from "./pages/order-page/Order";

export const App = () => {
  const paths = [
    { path: "/", element: <MainContent /> },
    { path: "/order", element: <Order /> },
  ];

  return (
    <div className='main--container'>
      <NavState>
        <MainContent />
      </NavState>
    </div>
  );
};
