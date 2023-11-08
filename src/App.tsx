import { useCallback, useEffect, useState, useMemo } from "react";
import "./App.scss";
import { MainContent } from "./pages/main-page/MainContent";
import jwt_decode from "jwt-decode";
import { AuthService } from "./services/auth.service";
import { Api } from "./services/api.service";
import { Geo } from "./services/geo.service";
import { LocalStore } from "./services/localStorage.service";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./store/store";
import { DotsFlashing } from "./components/loading/DotsFlashing";
import { usePosition } from "./hooks/usePosition";
import { ICity } from "./interfaces/city";

interface IToken {
  exp: number;
  iat: number;
  role: string;
  userId: string;
}

interface IState {
  isLoading: boolean;
  city: string;
}

export const App = () => {
  const [city, setCity] = useState<IState["city"]>("");
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState<IState["isLoading"]>(true);

  //кастомный хук для получения lat и lon по геолокации юзера
  const coor = usePosition();
  //переменная для зависимости в useEffect
  const latitude = coor.lat;

  const dispatch = useDispatch<Dispatch>();

  //переменная города из массива которая равна локальному городу
  const cityName = cities?.find((res) => res.name === city);
  //город из localstorage
  const result = LocalStore.getCurrentCity();

  //id города из store
  const cityId = useSelector((state: RootState) => state.order.cityId);

  //получение городов с сервера
  useEffect(() => {
    Api.getCities().then((response) =>
      setCities((prevState) => [...prevState, ...response.data]),
    );
  }, []);

  //добавление id города по умолчанию если localstorage city остался с предыдущей сессии при обновлении страницы
  //инициалзируется при срабатывании useEffect сета городов
  useEffect(() => {
    if (!cityId) {
      const resultCity = cities?.find((res) => res.name === result);
      if (resultCity) {
        dispatch.order.setCityId(resultCity?.id);
      }
    }
  }, [cities]);

  //глобальное изменение города в редакс
  useEffect(() => {
    if (cityName) {
      dispatch.order.setCityId(cityName?.id);
    }
  }, [city]);

  //хук токенов юзера
  useEffect(() => {
    const accessToken = AuthService.getAccessToken();
    if (accessToken) {
      const decodedHeader: IToken = jwt_decode(accessToken);
      Api.setToken(accessToken);
      Api.getUser(decodedHeader.userId).then((response) => {
        dispatch.user.setUser(response.data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  //сет локального города
  useEffect(() => {
    if (result) {
      setCity(result);
    } else if (latitude) {
      Geo.postLocation(coor).then((response) => {
        setCity(response.data.suggestions[0].data.city);
      });
    }
  }, [latitude]);

  //обработчик сета города для всех child компонентов
  const handleChangeCityName = useCallback((city: string) => {
    setCity(city);
  }, []);

  return (
    <div className="main">
      {isLoading ? (
        <DotsFlashing />
      ) : (
        <MainContent
          localCity={city}
          handleChangeCityName={handleChangeCityName}
        />
      )}
    </div>
  );
};
