import { AppButton } from "../app-button/AppButton";
import "./styles.scss";
import "./../../constants/colors";
import { COLORS } from "./../../constants/colors";
import { useState } from "react";
import { TEvent } from "../../interfaces/event";
import { LocalStore } from "../../services/localStorage.service";
import { Dispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { ICity } from "../../interfaces/city";
import { OneKkTwoTone } from "@mui/icons-material";

interface IProps {
  toggleIsGeoVisible: () => void;
  handleGeoModalTitle: () => void;
  cities: ICity[];
  localCity: string;
  handleCityId: (city: ICity) => void;
}

interface IState {
  isActive: boolean;
  currentCity: string;
}
export const GeoModal = ({
  toggleIsGeoVisible,
  handleGeoModalTitle,
  cities,
  localCity,
  handleCityId,
}: IProps) => {
  const [isActive, setIsActive] = useState<IState["isActive"]>(false);
  const [currentCity, setCurrentCity] = useState<IState["currentCity"]>("");

  const cityH = cities.find((city) => city.name === currentCity);

  //поле ввода города
  const handleCurrentCity = (e: TEvent) => {
    setCurrentCity(e.target.value);
  };

  //обработчик города при наличии совпадения с городами из сервера
  const handleCity = () => {
    if (cityH) {
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
                  // LocalStore.setCurrentCity(city.name);
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
                setCurrentCity(localCity);
                LocalStore.setCurrentCity(localCity);
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
