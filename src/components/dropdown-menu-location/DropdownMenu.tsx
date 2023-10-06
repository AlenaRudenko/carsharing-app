import { useState, useEffect } from "react";
import { AppIcon } from "../app-icon/AppIcon";
import { COLORS } from "../../constants/colors";
import "./styles.scss";
import { ICity } from "../../interfaces/city";
import { Api } from "../../services/api.service";
import { LocalStore } from "../../services/localStorage.service";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { useLocation } from "react-router-dom";

interface IProps {
  localCity: string | undefined;
  handleLocalStoreCity: (city: string) => void;
}

interface IState {
  isVisible: boolean;
  cities: ICity[];
}

export const DropdownMenu = ({ localCity, handleLocalStoreCity }: IProps) => {
  const dispatch = useDispatch<Dispatch>();
  const [isVisible, setIsVisible] = useState<IState["isVisible"]>(false);
  const [cities, setCities] = useState<IState["cities"]>([]);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const location = useLocation();

  //сет города в rematch и родителю App
  const handleSetCurrentLocation = (city: ICity) => {
    LocalStore.setCurrentCity(city.name);
    setIsVisible(false);
    handleLocalStoreCity(city!.name);
  };
  const handleIsVisible = () => {
    if (
      addressId &&
      location.pathname.includes("/order/order") &&
      location.pathname !== "/order/order-location"
    ) {
      return setIsVisible(false);
    } else return setIsVisible(true);
  };

  useEffect(() => {
    Api.getCities().then((response) => {
      setCities(response.data);
    });
  }, []);

  return (
    <div className="dropdown">
      <div
        className={`dropdown__current dropdown__current${
          !isVisible && "--unactive"
        }`}
      >
        <span
          onMouseOver={handleIsVisible}
          onMouseOut={() => {
            setIsVisible(false);
          }}
          style={{ color: COLORS.BLACK }}
        >
          {localCity}
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
          {[...cities]
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((city) => (
              <div key={city.id}>
                <li
                  onClick={() => {
                    handleSetCurrentLocation(city);
                  }}
                >
                  {city.name}
                </li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};
