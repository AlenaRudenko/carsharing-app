import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { ICoords } from "../interfaces/coords";
import { useState, useEffect } from "react";

interface IProps {
  coordsLocation: ICoords;
}

export const YandexMap = ({ coordsLocation }: IProps) => {
  return (
    <YMaps>
      <Map
        width='90%'
        height='90%'
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
