import "./styles.scss";
import { Header } from "../../components/header/Header";
import { OrderNavigation } from "./components/order-navigation/OrderNavigation";
import { AppIcon } from "../../components/app-icon/AppIcon";
import { COLORS } from "./../../constants/colors";
import { useEffect, useState } from "react";
import { OrderLocation } from "./order-location/OrderLocation";
import { OrderModel } from "./order-model/OrderModel";
import { OrderAdditionally } from "./order-additionally/OrderAdditionally";
import { OrderFull } from "./order-full/OrderFull";
import { Route, Routes } from "react-router";
import { OrderReview } from "./order-review-component/OrderReview";
import { AuthService } from "./../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { ICity } from "./../../interfaces/city";

interface IState {
  status: string[];
}
interface IProps {
  testCity: string;
  handleLocalStoreCity: (city: string | undefined) => void;
}

export const Order = ({ testCity, handleLocalStoreCity }: IProps) => {
  const navArray = ["Местоположение", "Модель", "Дополнительно", "Итого"];
  const [status, setStatus] = useState<IState["status"]>(["order-location"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!AuthService.getAccessToken()) {
      navigate("/");
    }
  });
  const paths = [
    "order-location",
    "order-model",
    "order-additionally",
    "order-full",
  ];
  const handleStatusOrder = () => {};
  return (
    <div className="order__container">
      <Header
        key={"2"}
        handleLocalStoreCity={handleLocalStoreCity}
        testCity={testCity}
        padding="20px 0px 50px 0px"
        size="35px"
      />
      <div className="order__navigation">
        {navArray.map((item, index) =>
          index < navArray.length - 1 ? (
            <>
              <OrderNavigation
                path={paths[index]}
                navigationItem={item}
                status={status}
              />
              <AppIcon icon="ArrowRight" color={COLORS.GREY} size={14} />
            </>
          ) : (
            <OrderNavigation
              status={status}
              path={paths[index]}
              navigationItem={item}
            />
          )
        )}
      </div>
      <div className="order__content">
        <div className="order__routes">
          <Routes>
            <Route path="order-location" element={<OrderLocation />} />
            <Route path="order-model" element={<OrderModel />} />
            <Route path="order-additionally" element={<OrderAdditionally />} />
            <Route path="order-full" element={<OrderFull />} />
          </Routes>
        </div>
        <OrderReview
          handleStatusOrder={handleStatusOrder}
          navPoint="car"
        ></OrderReview>
      </div>
    </div>
  );
};
