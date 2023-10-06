import "./styles.scss";
import { Header } from "../../components/header/Header";
import { OrderNavigation } from "./components/order-navigation/OrderNavigation";
import { AppIcon } from "../../components/app-icon/AppIcon";
import { COLORS } from "./../../constants/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./../../store/store";
import { OrderLocation } from "./order-location/OrderLocation";
import { OrderModel } from "./order-model/OrderModel";
import { OrderAdditionally } from "./order-additionally/OrderAdditionally";
import { OrderFull } from "./order-full/OrderFull";
import { Route, Routes, useLocation } from "react-router";
import { OrderReview } from "./order-review-component/OrderReview";
import { AuthService } from "./../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { ICoords } from "../../interfaces/coords";
import { ICar } from "../../interfaces/car";
import { ICity } from "../../interfaces/city";
import { IVariant } from "../../interfaces/variant";
import { ITariff } from "../../interfaces/tariffs";
import { TEvent } from "../../interfaces/event";
import { TPath } from "../../pages/main-page/MainContent";
import { Api } from "../../services/api.service";

interface IState {
  address: string;
}

interface IProps {
  localCity: string;
  handleLocalStoreCity?: (city: string | undefined) => void;
  confirmedOrderPaths: TPath[];
  handleConfirmedOrderPaths: (path: TPath) => void;
  handleChangeStartPicker: (time: TEvent) => void;
  handleChangeEndPicker: (time: TEvent) => void;
  handleResetStartPicker: () => void;
  handleResetEndPicker: () => void;
  startsAt: string;
  endsAt: string;
}

interface IAddress {
  id: string;
  name: string;
}

export const Order = ({
  localCity,
  handleLocalStoreCity,
  confirmedOrderPaths,
  handleConfirmedOrderPaths,
  handleChangeStartPicker,
  handleChangeEndPicker,
  handleResetStartPicker,
  handleResetEndPicker,
  startsAt,
  endsAt,
}: IProps) => {
  const navArray = [
    { name: "Местоположение", index: 1, path: "order-location" },
    { name: "Модель", index: 2, path: "order-model" },
    { name: "Дополнительно", index: 3, path: "order-additionally" },
    { name: "Итого", index: 4, path: "order-full" },
  ];

  const addresses = [
    { name: "ул. Гагарина 88", id: "1" },
    { name: "ул. Васенко 15", id: "2" },
    { name: "ул. Ленина 55", id: "3" },
  ];
  const paths = [
    "order-location",
    "order-model",
    "order-additionally",
    "order-full",
  ];
  const fullPathNames = [
    "/order/order-location",
    "/order/order-model",
    "/order/order-additionally",
    "/order/order-full",
  ];

  const [paddingHeader, setPaddingHeader] = useState("20px 0px 50px 0px");
  const [address, setAddress] = useState("");
  const [duration, setDuration] = useState(0);
  const [cars, setCars] = useState<ICar[]>([]);
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();

  const isAuthToken = AuthService.getAccessToken();

  //возврат к главной странице если токена нет
  useEffect(() => {
    if (!isAuthToken) {
      navigate("/");
    }
  }, [isAuthToken]);

  //сет всех данных в стейт
  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
    Api.getTariffs().then((response) => setTariffs(response.data));
    Api.getVariants().then((response) => {
      setVariants(response.data);
    });
    Api.getCities().then((response) => setCities(response.data));
  }, []);

  //смена отступов
  useEffect(() => {
    document.documentElement.clientWidth < 992
      ? setPaddingHeader("10px 0px 15px 0px")
      : setPaddingHeader("20px 0px 50px 0px");
  }, []);

  //переход по кнопке на следующий уровень заказа
  const handleNavigation = () => {
    navigate(fullPathNames[fullPathNames.indexOf(location.pathname) + 1]);
  };
  useEffect(() => {
    console.log("RE RENDER");
  });
  //сет адреса в редакс
  const handleSetCurrentAddress = (address: IAddress) => {
    setAddress(address.name);
    dispatch.order.setAddressId(address.id);
  };
  const handleDuration = (time: number) => {
    setDuration(time);
    console.log("ОПАОПАОПАПА");
  };

  const tariffId = useSelector((state: RootState) => state.order.tariffId);
  const currentTariff = tariffs?.find((tariff) => tariff.id === tariffId);
  return (
    <div className="order__container">
      <Header
        key={"2"}
        handleLocalStoreCity={handleLocalStoreCity}
        localCity={localCity}
        padding={paddingHeader}
        size="35px"
      />
      <div className="order__navigation">
        {navArray.map((item) => (
          <Fragment key={item.index}>
            <OrderNavigation
              confirmedOrderPaths={confirmedOrderPaths}
              navigationItem={item}
            />
            {item.index < navArray.length && (
              <AppIcon icon="ArrowRight" color={COLORS.GREY} size={14} />
            )}
          </Fragment>
        ))}
      </div>
      <div
        className={`order__content order__content${
          location.pathname === "/order/order-full" ? "--fullPage" : ""
        }`}
      >
        <div
          className={`order__routes order__routes${
            location.pathname === "/order/order-full" ? "--fullPage" : ""
          }`}
        >
          <Routes>
            <Route
              path="order-location"
              element={
                <OrderLocation
                  cities={cities}
                  handleSetCurrentAddress={handleSetCurrentAddress}
                  addresses={addresses}
                  localCity={localCity}
                />
              }
            />
            <Route path="order-model" element={<OrderModel cars={cars} />} />

            <Route
              path="order-additionally"
              element={
                <OrderAdditionally
                  handleDuration={handleDuration}
                  currentTariff={currentTariff!}
                  cars={cars}
                  tariffs={tariffs}
                  handleChangeStartPicker={handleChangeStartPicker}
                  handleChangeEndPicker={handleChangeEndPicker}
                  handleResetStartPicker={handleResetStartPicker}
                  handleResetEndPicker={handleResetEndPicker}
                  startsAt={startsAt}
                  endsAt={endsAt}
                />
              }
            />

            <Route path="order-full" element={<OrderFull />} />
          </Routes>
        </div>
        <OrderReview
          duration={duration}
          currentTariff={currentTariff!}
          cars={cars}
          addresses={addresses}
          handleNavigation={handleNavigation}
          handleConfirmedOrderPaths={handleConfirmedOrderPaths}
        ></OrderReview>
      </div>
    </div>
  );
};
