import { AppButton } from "../app-button/AppButton";
import "./styles.scss";
import "./../../constants/colors";
import { COLORS } from "./../../constants/colors";
import { useState } from "react";
import { NavContext } from "../../context/NavState";
import { useContext } from "react";
import { TEvent } from "../../interfaces/event";

interface IProps {
  toggleIsGeoVisible: () => void;
  handleGeoModalTitle: () => void;
}

export const GeoModal = ({
  toggleIsGeoVisible,
  handleGeoModalTitle,
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const { cities, handleCurrentGeoLocation } = useContext(NavContext);
  const handleCurrentCity = (e: TEvent) => {
    setCurrentCity(e.target.value);
    handleIsDisabled();
  };
  const handleIsDisabled = () => {
    return cities.find((city) => city.name === currentCity)
      ? setIsDisabled(!isDisabled)
      : isDisabled;
  };
  return (
    <div className='geoModal__content'>
      {isActive ? (
        <div className='geoModal__choise'>
          <input
            className='geoModal__input'
            list='cities'
            value={currentCity}
            onChange={handleCurrentCity}
          />
          <datalist id='cities'>
            {cities.map((city) => (
              <option value={city.name} />
            ))}
          </datalist>
          <div className='geoModal__choiseButton'>
            <AppButton
              isDisabled={isDisabled}
              size={"small"}
              text={"Выбрать"}
              onClick={() => {
                toggleIsGeoVisible();
                handleCurrentGeoLocation(currentCity);
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className='geoModal__button'>
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
          <div className='geoModal__button'>
            <AppButton
              text={"Да, верно"}
              onClick={toggleIsGeoVisible}
              size={"regular"}
            />
          </div>
        </>
      )}
    </div>
  );
};
