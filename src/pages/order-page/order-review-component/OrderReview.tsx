import { useNavigate, useLocation } from "react-router-dom";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { OrderField } from "./components/OrderField";
interface IProps {
  address: string;
  status: string[];
  paths: string[];
  handleStatusOrder: (point: string) => void;
}

interface IState {
  isDisabled: boolean;
}
export const OrderReview = ({
  paths,
  status,
  handleStatusOrder,
  address,
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [cars, setCars] = useState<ICar[]>();
  const [navPoint, setNavPoint] = useState("order-location");
  const carId = useSelector((state: RootState) => state.order.carId);
  const cityId = useSelector((state: RootState) => state.order.cityId);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const carVariantId = useSelector(
    (state: RootState) => state.order.carVariantId
  );
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCar = useMemo(() => {
    return cars?.find((car) => car.id === carId);
  }, [cars, carId]);
  //
  const variantW = selectedCar?.variants.find(
    (item) => item.id === carVariantId
  );
  useEffect(() => {
    if (
      status.includes("order-location") &&
      !status.includes("order-model") &&
      addressId
    ) {
      setNavPoint("order-location");
      setIsDisabled(false);
    } else if (
      status.includes("order-model") &&
      !status.includes("order-additionally") &&
      carId
    ) {
      setNavPoint("order-model");
      setIsDisabled(false);
    } else if (
      status.includes("order-additionally") &&
      !status.includes("order-full") &&
      carVariantId
    ) {
      setNavPoint("order-additionally");
      setIsDisabled(false);
    } else setIsDisabled(true);
  });
  const handleContinueButton = () => {
    handleStatusOrder(navPoint);
  };
  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
  });
  useEffect(() => {
    if (location.pathname !== "/order/order-location" && !carId && !addressId) {
      navigate("/order/order-location");
    }
  }, []);
  return (
    <div className="orderReview__container">
      <span>Ваш заказ:</span>
      <div className="orderReview__content">
        {addressId && (
          <OrderField
            description={"пункт выдачи автомобиля:"}
            value={address}
          />
        )}
        {selectedCar && (
          <>
            <OrderField
              description={"Марка автомобиля"}
              value={selectedCar?.brand}
            />
            <OrderField
              description={"Марка автомобиля"}
              value={selectedCar?.model}
            />
          </>
        )}
        {carVariantId && (
          <div className="orderReview__previewCarColor">
            <img
              src={`https://api.need-car.online/${variantW?.imageUrl}`}
              alt=""
            />
          </div>
        )}
      </div>
      <AppButton
        isDisabled={isDisabled}
        text="Продолжить"
        onClick={handleContinueButton}
      />
    </div>
  );
};
