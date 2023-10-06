import { useEffect, useState } from "react";
import { Geo } from "./../services/geo.service";

type Coords = {
  lat: number;
  lon: number;
};

export const usePosition = () => {
  const [position, setPosition] = useState<Coords>({ lat: 0, lon: 0 });
  const [error, setError] = useState("");

  const onChange = ({ coords }: any) => {
    setPosition({ lat: coords.latitude, lon: coords.longitude });
  };
  const onError = (error: any) => {
    setError(error);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => {
      geo.clearWatch(watcher);
    };
  }, []);
  return { ...position, error };
};
