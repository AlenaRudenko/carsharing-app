import { useContext } from "react";
import {
  NavState,
  NewContext,
  NewContextInterface,
} from "../../context/NavState";
import { Button } from "./Button";
import "./styles.css";

export const NavPageComponent = () => {
  const { isOpen, toggleNavbarFunc } =
    useContext<NewContextInterface>(NewContext);
  return (
    <NavState>
      <div className="sidebar">
        <NewContext.Consumer>{(value) => <Button />}</NewContext.Consumer>
      </div>{" "}
    </NavState>
  );
};
