import "./styles.scss";
import { Header } from "../../components/header/Header";
import { OrderNavigation } from "./components/order-navigation/OrderNavigation";
import { AppIcon } from "../../components/app-icon/AppIcon";
import { COLORS } from "./../../constants/colors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "./../../store/store";
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
import { Api } from "../../services/api.service";

interface IState {
  status: string[];
  address: string;
}

interface IProps {
  localCity: string;
  handleLocalStoreCity?: (city: string | undefined) => void;
  coordsLocation: ICoords;
}
interface IAddress {
  id: string;
  name: string;
}
export const Order = ({
  localCity,
  handleLocalStoreCity,
  coordsLocation,
}: IProps) => {
  const navArray = ["Местоположение", "Модель", "Дополнительно", "Итого"];

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
  const [status, setStatus] = useState<IState["status"]>(["order-location"]);

  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();

  useEffect(() => {
    if (!AuthService.getAccessToken()) {
      navigate("/");
    }
  });

  //смена отступов
  useEffect(() => {
    document.documentElement.clientWidth < 992
      ? setPaddingHeader("10px 0px 15px 0px")
      : setPaddingHeader("20px 0px 50px 0px");
  }, []);

  const handleStatusNavigation = () => {
    navigate(fullPathNames[fullPathNames.indexOf(location.pathname) + 1]);
  };

  const handleStatusOrder = (point: string) => {
    setStatus([...status, paths[paths.indexOf(point) + 1]]);
  };

  const handleSetCurrentAddress = (address: IAddress) => {
    setAddress(address.name);
    dispatch.order.setAddressId(address.id);
  };
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
        {navArray.map((item, index) => (
          <Fragment key={item}>
            <OrderNavigation
              path={paths[index]}
              navigationItem={item}
              status={status}
            />
            {index < navArray.length - 1 && (
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
                  handleSetCurrentAddress={handleSetCurrentAddress}
                  addresses={addresses}
                  localCity={localCity}
                  coordsLocation={coordsLocation}
                />
              }
            />
            <Route path="order-model" element={<OrderModel />} />
            <Route path="order-additionally" element={<OrderAdditionally />} />
            <Route path="order-full" element={<OrderFull />} />
          </Routes>
        </div>
        <OrderReview
          addresses={addresses}
          handleStatusNavigation={handleStatusNavigation}
          handleStatus={handleStatusOrder}
        ></OrderReview>
      </div>
    </div>
  );
};
