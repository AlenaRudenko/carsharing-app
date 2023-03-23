import "./styles.scss";
import { Header } from "../../components/header/Header";
import { OrderNavigation } from "./components/order-navigation/OrderNavigation";
import { AppIcon } from "../../components/app-icon/AppIcon";
import { COLORS } from "./../../constants/colors";
import { useEffect } from "react";
import { OrderLocation } from "./order-location/OrderLocation";
import { OrderModel } from "./order-model/OrderModel";
import { OrderAdditionally } from "./order-additionally/OrderAdditionally";
import { OrderFull } from "./order-full/OrderFull";
import { Route, Routes } from "react-router";
import { OrderReview } from "./order-review-component/OrderReview";
import { AuthService } from "./../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const Order = () => {
  const navArray = ["Местоположение", "Модель", "Дополнительно", "Итого"];
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

  return (
    <div className="order__container">
      <Header padding="20px 0px 50px 0px" size="35px" />
      <div className="order__navigation">
        {navArray.map((item, index) =>
          index < navArray.length - 1 ? (
            <>
              <OrderNavigation
                path={paths[index]}
                navigationItem={item}
                status={"s"}
              />
              <AppIcon icon="ArrowRight" color={COLORS.GREY} size={14} />
            </>
          ) : (
            <OrderNavigation
              status={"a"}
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
        <OrderReview navPoint=""></OrderReview>
      </div>
    </div>
  );
};
