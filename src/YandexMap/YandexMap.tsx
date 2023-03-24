import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../services/api.service";
import { ICity } from "../interfaces/city";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface IProps {
  localCity: string;
  coordsLocation: ICoords;
}
interface ICoords {
  lat: number;
  lon: number;
}

export const YandexMap = ({ localCity, coordsLocation }: IProps) => {
  useEffect(() => {
    console.log("Я родился", coordsLocation);
  }, [coordsLocation]);
  return (
    <YMaps>
      <Map
        width={400}
        height={350}
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
