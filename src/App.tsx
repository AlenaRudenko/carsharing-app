import "./App.css";
import { NavState } from "./context/NavState";
import { MainContent } from "./pages/main-page/MainContent";

import { Navigation } from "./pages/nav-page/Navigation";

export const App = () => {
  return (
    <div className='main--container'>
      <NavState>
        <Navigation />
        <MainContent />
      </NavState>
    </div>
  );
};
