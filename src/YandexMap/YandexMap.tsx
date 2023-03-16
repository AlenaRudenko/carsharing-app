import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../services/api.service";
import { ICity } from "../interfaces/city";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
export const YandexMap = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [currentLocation, setCurrentGeoLocation] = useState({ lat: 0, lon: 0 });
  const [cityName, setCityName] = useState("");
  const cityId = useSelector((state: RootState) => state.order.cityId);
  useEffect(() => {}, []);
  useEffect(() => {
    const onChange = (params: any) => {
      Api.getCities().then((response) => {
        setCities([...cities, ...response.data]);
        let city = cities.find((city) => city.id === cityId);
        setCityName(city?.name || "");
        console.log("ffffffffffff", cityName);
      });
      axios
        .get(
          `https://geocode-maps.yandex.ru/1.x/?apikey=53d5212f-7d74-43fd-a7c7-c464212677b9&format=json&geocode=${cityName}`
        )
        .then((response) => {
          let coords =
            response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .map((coord: string) => +coord);
          setCurrentGeoLocation({ lat: coords[1], lon: coords[0] });
          console.log("ГДЕ Я ВАЩЕ", coords);
        });
    };
    navigator.geolocation.getCurrentPosition(onChange);
    console.log("ffffffffffff", cityName);
  }, []);
  return (
    <YMaps>
      <Map
        width={400}
        height={350}
        defaultState={{
          center: [currentLocation.lat, currentLocation.lon],
          zoom: 15,
        }}
      >
        <Placemark geometry={[54.196049, 45.167477]} />
      </Map>
    </YMaps>
  );
};
