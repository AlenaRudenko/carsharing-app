import { AppButton } from "../app-button/AppButton";
import "./styles.scss";
import "./../../constants/colors";
import { COLORS } from "./../../constants/colors";
import { useState } from "react";
import { NavContext } from "../../context/NavState";
import { useContext } from "react";
import { TEvent } from "../../interfaces/event";
import { LocalStore } from "../../services/localStorage.service";
import { Dispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { ICity } from "../../interfaces/city";

interface IProps {
  toggleIsGeoVisible: () => void;
  handleGeoModalTitle: () => void;
  cities: ICity[];
  localStoreCity: string;
}

export const GeoModal = ({
  toggleIsGeoVisible,
  handleGeoModalTitle,
  cities,
  localStoreCity,
}: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentCity, setCurrentCity] = useState("");

  const dispatch = useDispatch<Dispatch>();
  const handleCurrentCity = (e: TEvent) => {
    setCurrentCity(e.target.value);
  };
  return (
    <div className="geoModal__content">
      {isActive ? (
        <div className="geoModal__choise">
          <input
            className="geoModal__input"
            list="cities"
            value={currentCity}
            onChange={handleCurrentCity}
          />
          <datalist id="cities">
            {cities.map((city) => (
              <option
                value={city.name}
                onClick={() => {
                  setCurrentCity(city.name);
                  LocalStore.setCurrentCity(city.name);
                }}
              />
            ))}
          </datalist>
          <div className="geoModal__choiseButton">
            <AppButton
              isDisabled={!cities.some((el) => el.name === currentCity)}
              size={"small"}
              text={"Выбрать"}
              onClick={() => {
                LocalStore.setCurrentCity(currentCity);
                toggleIsGeoVisible();
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="geoModal__button">
            <AppButton
              text={"Нет, выбрать другой"}
              backgroundColor={COLORS.GREY}
              size={"regular"}
              onClick={() => {
                setIsActive(!isActive);
                handleGeoModalTitle();
              }}
            />
          </div>
          <div className="geoModal__button">
            <AppButton
              text={"Да, верно"}
              onClick={() => {
                const cityId = cities.find(
                  (city) => city.name === localStoreCity
                );
                toggleIsGeoVisible();
                LocalStore.setCurrentCity(localStoreCity);
              }}
              size={"regular"}
            />
          </div>
        </>
      )}
    </div>
  );
};
