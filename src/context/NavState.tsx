import React, { useState } from "react";
export interface NewContextInterface {
  isOpen: Boolean;
  toggleNavbar: () => void;
}

export const NewContext = React.createContext({
  isOpen: true,
  toggleNavbar: () => {},
});
export const NavState = ({ children }) => {
  const [isOpen, toggleNavbar] = useState(false);
  const toggleNavbarFunc = () => {
    toggleNavbar(!isOpen);
  };
  return (
    <NewContext.Provider value={{ isOpen, toggleNavbarFunc }}>
      {children}
    </NewContext.Provider>
  );
};
