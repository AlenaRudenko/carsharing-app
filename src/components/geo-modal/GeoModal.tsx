import { AppButton } from "../app-button/AppButton";
import "./styles.scss";
import "./../../constants/colors";
import { COLORS } from "./../../constants/colors";
import { useState, useEffect } from "react";
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
  handleCityId: (city: ICity) => void;
}

export const GeoModal = ({
  toggleIsGeoVisible,
  handleGeoModalTitle,
  cities,
  localStoreCity,
  handleCityId,
}: IProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const [city, setCity] = useState<ICity>({} as ICity);
  const dispatch = useDispatch<Dispatch>();
  const handleCurrentCity = (e: TEvent) => {
    setCurrentCity(e.target.value);
  };
  const cityH = cities.find((city) => city.name === currentCity);
  
  const handleCity = () => {
    if (cityH) {
      setCity(cityH);
      handleCityId(cityH);
    }
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
                key={city.name}
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
                handleCity();
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
                toggleIsGeoVisible();
                setCurrentCity(localStoreCity);
                LocalStore.setCurrentCity(localStoreCity);
                handleCity();
              }}
              size={"regular"}
            />
          </div>
        </>
      )}
    </div>
  );
};
