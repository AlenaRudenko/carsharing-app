import { useNavigate, useLocation } from "react-router-dom";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { OrderField } from "./components/OrderField";
import { Functional } from "./components/functional/Functional";
import { ITariff } from "../../../interfaces/tariffs";
import { TariffOptions } from "./components/tariff/TariffOptions";
interface IProps {
  addresses: IAddresses[];
  status: string[];
  paths: string[];
  handleStatusOrder: (point: string) => void;
}

interface IState {
  isDisabled: boolean;
}
interface IAddresses {
  name: string;
  id: string;
}
export const OrderReview = ({
  paths,
  status,
  addresses,
  handleStatusOrder,
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [cars, setCars] = useState<ICar[]>();
  const [tariffs, setTariffs] = useState<ITariff[]>();
  const [navPoint, setNavPoint] = useState("order-location");
  const carId = useSelector((state: RootState) => state.order.carId);
  const cityId = useSelector((state: RootState) => state.order.cityId);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const carVariantId = useSelector(
    (state: RootState) => state.order.carVariantId
  );
  const tariffId = useSelector((state: RootState) => state.order.tariffId);
  const location = useLocation();
  const navigate = useNavigate();
  const functional = ["Удаленный прогрев", "Бортовой компьютер", "Полный бак"];
  const selectedCar = useMemo(() => {
    return cars?.find((car) => car.id === carId);
  }, [cars, carId]);
  const selectedAddress = addresses?.find((item) => item.id === addressId);
  const variantW = selectedCar?.variants.find(
    (item) => item.id === carVariantId
  );
  const currentTariff = tariffs?.find((tariff) => tariff.id === tariffId);
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
    Api.getTariffs().then((response) => setTariffs(response.data));
  }, []);
  useEffect(() => {
    if (location.pathname !== "/order/order-location" && !carId && !addressId) {
      navigate("/order/order-location");
    }
  }, []);
  return (
    <div className="orderReview__container">
      <h2>Ваш заказ</h2>
      <div className="orderReview__car">
        {selectedCar && (
          <>
            <OrderField
              fontSize={"20px"}
              value={`${selectedCar?.brand} ${selectedCar?.model}`}
            />
            <div className="orderReview__carPic">
              <img
                src={`https://api.need-car.online/${
                  variantW
                    ? variantW?.imageUrl
                    : selectedCar.variants[1].imageUrl
                }`}
                alt=""
              />
            </div>
          </>
        )}
      </div>
      <div className="orderReview__additional">
        {selectedCar && (
          <div className="functional">
            {functional.map((item) => (
              <Functional key={item} text={item} />
            ))}
          </div>
        )}
        {currentTariff && <TariffOptions currentTariff={currentTariff} />}
      </div>

      <div className="orderReview__pickPoint">
        {selectedAddress && (
          <OrderField
            description={"пункт выдачи автомобиля:"}
            value={selectedAddress?.name}
          />
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
