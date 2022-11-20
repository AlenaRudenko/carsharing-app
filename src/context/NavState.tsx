import React, { useState } from "react";

export interface IContext {
  isOpen: boolean;
  toggleIsOpenFunc: () => void;
}
export const NavContext = React.createContext<IContext>({
  isOpen: true,
  toggleIsOpenFunc: () => {},
});

interface IProps {
  children: React.ReactNode;
}
export const NavState = ({ children }: IProps) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const toggleIsOpenFunc = () => {
    toggleIsOpen(!isOpen);
  };
  return (
    <NavContext.Provider value={{ isOpen, toggleIsOpenFunc }}>
      {children}
    </NavContext.Provider>
  );
};
