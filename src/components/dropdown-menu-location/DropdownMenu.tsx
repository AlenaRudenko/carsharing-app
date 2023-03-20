import { useState, useEffect } from "react";
import { AppIcon } from "../app-icon/AppIcon";
import { COLORS } from "../../constants/colors";
import "./styles.scss";
import { Geo } from "../../services/geo.service";
import { NavContext } from "../../context/NavState";
import { useContext } from "react";
import { ICity } from "../../interfaces/city";
import { Api } from "../../services/api.service";
import { LocalStore } from "../../services/localStorage.service";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";

interface IProps {
  testCity: string | undefined;
  handleLocalStoreCity: (city: string) => void;
}

export const DropdownMenu = ({ testCity, handleLocalStoreCity }: IProps) => {
  const dispatch = useDispatch<Dispatch>();
  const [isVisible, setIsVisible] = useState(false);
  const [cities, setCities] = useState<ICity[]>([]);

  const handleSetIsVisible = () => {
    setIsVisible(!isVisible);
  };
  const handleSetCurrentLocation = (city: ICity) => {
    LocalStore.setCurrentCity(city.name);
    handleSetIsVisible();
    dispatch.order.setCityId(city.id);
    handleLocalStoreCity(city!.name);
  };
  useEffect(() => {
    Api.getCities().then((response) => {
      setCities((cities) => [...cities, ...response.data]);
    });
  }, []);

  return (
    <div className="dropdown">
      <div className="dropdown__current">
        <span
          onMouseOver={() => {
            setIsVisible(true);
          }}
          onMouseOut={() => {
            setIsVisible(false);
          }}
          style={{ color: COLORS.BLACK, cursor: "pointer" }}
        >
          {testCity}
        </span>
      </div>
      <div className="dropdown__icon" style={{ userSelect: "none" }}>
        <AppIcon size={15} icon={"MapPin"} color={COLORS.PRIMARY} />
      </div>
      <div
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseOut={() => {
          setIsVisible(false);
        }}
        className={`dropdown__content dropdown__content${
          isVisible ? "--open" : "--close"
        }`}
      >
        <ul>
          {cities
            .filter((city) => city.name !== "")
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((city) => (
              <li
                onClick={() => {
                  handleSetCurrentLocation(city);
                }}
              >
                {city.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
