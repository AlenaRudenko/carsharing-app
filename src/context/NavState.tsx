import React, { useState } from "react";
export interface NewContextInterface {
  isOpen: Boolean;
  toggleNavbarFunc: () => void;
}

export const NewContext = React.createContext<NewContextInterface>({
  isOpen: true,
  toggleNavbarFunc: () => {},
});
export const NavState = ({ children }: any) => {
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
