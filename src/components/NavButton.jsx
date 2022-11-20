import Hamburger from "hamburger-react";
import { useContext } from "react";

import { NavContext } from "../context/NavState";

export const NavButton = () => {
  const { isOpen, toggleIsOpenFunc } = useContext(NavContext);
  return (
    <Hamburger toggled={isOpen} toggle={toggleIsOpenFunc} color={"white"} />
  );
};
