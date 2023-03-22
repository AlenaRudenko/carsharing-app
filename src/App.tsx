import { useEffect, useState } from "react";
import "./App.css";
import { MainContent } from "./pages/main-page/MainContent";
import jwt_decode from "jwt-decode";
import { AuthService } from "./services/auth.service";
import { Api } from "./services/api.service";
import { Geo } from "./services/geo.service";
import { LocalStore } from "./services/localStorage.service";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./store/store";
import { IUser } from "./interfaces/user";

interface IToken {
  exp: number;
  iat: number;
  role: string;
  userId: string;
}
export const App = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lon: 0,
  });
  const [city, setCity] = useState("");
  const dispatch = useDispatch<Dispatch>();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const accessToken = AuthService.getAccessToken();
    if (accessToken) {
      const decodedHeader: IToken = jwt_decode(accessToken);
      Api.setToken(accessToken);
      Api.getUser(decodedHeader.userId).then((response) =>
        dispatch.user.setUser(response.data)
      );
    }
    const onChange = (params: any) => {
      setCoordinates({
        lat: params.coords.latitude,
        lon: params.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(onChange);
  }, []);
  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      Geo.postLocation(coordinates).then((response) => {
        LocalStore.setCurrentCity(response.data.suggestions[0].data.city);
        setCity(response.data.suggestions[0].data.city);
      });
    }
  });

  return (
    <div className="main--container">
      <MainContent localCity={city} />
    </div>
  );
};
