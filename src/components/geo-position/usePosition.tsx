import { useState, useEffect } from "react";
interface IState {
  error: string | null;
}

export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState<IState["error"]>(null);
  useEffect(() => {
    const geo = navigator.geolocation.getCurrentPosition((location) => {
      return location;
    });
    console.log(geo);
  }, []);
  return { ...position, error };
};
