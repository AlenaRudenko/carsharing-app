import { useContext } from "react";
import { NewContext } from "../../context/NavState";

export const Button = () => {
    const {isOpen, toggleNavbarFunc} = useContext(NewContext);
  return (
    <button
      className={isOpen ? "white" : "black"}
      onClick={toggleNavbarFunc}
    >
      HELLO
    </button>
  );
};
