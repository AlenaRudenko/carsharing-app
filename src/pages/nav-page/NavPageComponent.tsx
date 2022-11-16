import { useContext } from "react";
import { NavState, NewContext } from "../../context/NavState";
import "./styles.css";
interface IProps {
  isOpen: boolean;
  toggleNavbarFunc: () => void;
}

export const NavPageComponent = () => {
  return (
    <div className="sidebar">
      <NavState>
        <NewContext.Consumer>
          {(value) => <button>HELLO</button>}
        </NewContext.Consumer>
        <button>HELLO</button>
      </NavState>
    </div>
  );
};
