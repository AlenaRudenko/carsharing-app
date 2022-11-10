import "./App.css";
import { MainPageComponent } from "./pages/main-page/MainPageComponent";
import { NavPageComponent } from "./pages/nav-page/NavPageComponent";

export const App = () => {
  return (
    <div className='main--container'>
      <NavPageComponent />
      <MainPageComponent />
    </div>
  );
};
