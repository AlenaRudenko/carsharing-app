import React, { useState } from "react";
import { ICity } from "../interfaces/city";

export interface IContext {
  isOpen: boolean;
  toggleIsOpenFunc: () => void;
  currentGeoLocation: string;
  handleCurrentGeoLocation: (location: string) => void;
  cities: ICity[];
  handleSetCities: (cities: ICity[]) => void;
}
export const NavContext = React.createContext<IContext>({
  isOpen: true,
  toggleIsOpenFunc: () => {},
  currentGeoLocation: "",
  handleCurrentGeoLocation: () => {},
  cities: [],
  handleSetCities: () => {},
});

interface IProps {
  children: React.ReactNode;
}
export const NavState = ({ children }: IProps) => {
  const [currentGeoLocation, setCurrentGeoLocation] = useState("");
  const [cities, setCities] = useState<ICity[]>([]);
  const [isOpen, toggleIsOpen] = useState(false);
  const toggleIsOpenFunc = () => {
    toggleIsOpen(!isOpen);
  };
  const handleCurrentGeoLocation = (location: string) => {
    setCurrentGeoLocation(location);
  };
  const handleSetCities = (newCities: ICity[]) => {
    setCities((cities) => [...cities, ...newCities]);
  };
  return (
    <NavContext.Provider
      value={{
        isOpen,
        toggleIsOpenFunc,
        currentGeoLocation,
        handleCurrentGeoLocation,
        cities,
        handleSetCities,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
