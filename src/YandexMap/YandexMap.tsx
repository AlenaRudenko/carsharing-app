import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { ICoords } from "../interfaces/coords";
import { useState, useEffect } from "react";
import { Api } from "./../services/api.service";
import { ICity } from "../interfaces/city";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

export const YandexMap = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [coordsLocation, setCoordsLocation] = useState<ICoords>({
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    Api.getCities().then((response) => setCities(response.data));
  }, []);
  const currentCityId = useSelector((state: RootState) => state.order.cityId);
  const city = cities.find((city) => city.id === currentCityId);

  //хук сета координат для карты в заказах на основании города из стейта
  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://geocode-maps.yandex.ru/1.x/?apikey=53d5212f-7d74-43fd-a7c7-c464212677b9&format=json&geocode=${city.name}`,
        )
        .then((response) => {
          let coords =
            response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .map((coord: string) => +coord);
          setCoordsLocation({ lat: coords[0], lon: coords[1] });
        });
    }
  }, [city]);
  return (
    <YMaps>
      <Map
        width="90%"
        height="90%"
        state={{
          center: [coordsLocation.lon, coordsLocation.lat],
          zoom: 15,
        }}
      >
        <Placemark geometry={[54.196049, 45.167477]} />
      </Map>
    </YMaps>
  );
};
