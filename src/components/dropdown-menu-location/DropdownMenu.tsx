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
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store/store";

interface IState {
  location: ILocation;
}
interface ILocation {
  latitude: null | number;
  longitude: null | number;
}
export const DropdownMenu = () => {
  const { currentGeoLocation, handleCurrentGeoLocation, handleSetCities } =
    useContext(NavContext);
  const dispatch = useDispatch<Dispatch>();
  const [location, setCurrentLocation] = useState({
    lat: 0,
    lon: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [cities, setCities] = useState<ICity[]>([]);

  const handleSetIsVisible = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const onChange = (params: any) => {
      setCurrentLocation({
        lat: params.coords.latitude,
        lon: params.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(onChange);
  }, []);
  // useEffect(() => {
  //   if (location.lat && location.lon) {
  //     Geo.postLocation(location)
  //       .then((response) => {
  //         handleCurrentGeoLocation(response.data.suggestions[0].data.city);
  //         LocalStore.setCity(response.data.suggestions[0].data.city)
  //       }

  //       )
  //       .catch((error) => console.log("БЛЯТЬ", error));
  //   }
  // }, [location]);
  useEffect(() => {
    Api.getCities().then((response) => {
      setCities((cities) => [...cities, ...response.data]);
      handleSetCities(response.data);
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
          {currentGeoLocation}
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
            .filter((city) => city.name !== currentGeoLocation)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((city) => (
              <li
                onClick={() => {
                  LocalStore.setCurrentCity(city.name);
                  handleCurrentGeoLocation(city.name);
                  handleSetIsVisible();
                  dispatch.order.setCityId(city.id);
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
