import { useNavigate, useLocation } from "react-router-dom";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../../store/store";
import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { OrderField } from "./components/OrderField";
import { Functional } from "./components/functional/Functional";
import { ITariff } from "../../../interfaces/tariffs";
import { IVariant } from "../../../interfaces/variant";
import { TariffOptions } from "./components/tariff/TariffOptions";
import { TariffVariants } from "./components/tariff-variants/TariffVariants";
interface IProps {
  addresses: IAddresses[];
  handleStatusNavigation: () => void;
  handleStatus: (status: string) => void;
}

interface IState {
  isDisabled: boolean;
}
interface IAddresses {
  name: string;
  id: string;
}
export const OrderReview = ({
  addresses,
  handleStatusNavigation,
  handleStatus,
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [cars, setCars] = useState<ICar[]>();
  const [tariffs, setTariffs] = useState<ITariff[]>();
  const [variants, setVariants] = useState<IVariant[]>();
  const [navPoint, setNavPoint] = useState("");
  const carId = useSelector((state: RootState) => state.order.carId);
  const cityId = useSelector((state: RootState) => state.order.cityId);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const carVariantId = useSelector(
    (state: RootState) => state.order.carVariantId
  );
  const tariffId = useSelector((state: RootState) => state.order.tariffId);
  const dispatch = useDispatch<Dispatch>();
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
  const childChair = useSelector((state: RootState) => state.order.childChair);
  const carEnsurance = useSelector(
    (state: RootState) => state.order.carEnsurance
  );
  const currentVariant = useSelector(
    (state: RootState) => state.order.variantId
  );
  const lifeEnsurance = useSelector(
    (state: RootState) => state.order.lifeEnsurance
  );
  //смена статуса кнопки и статусов навигации сверху
  useEffect(() => {
    if (location.pathname === "/order/order-location" && addressId) {
      handleStatus("order-location");
      setIsDisabled(false);
    } else if (location.pathname === "/order/order-model" && carId) {
      handleStatus("order-model");
      setIsDisabled(false);
    } else if (
      location.pathname === "/order/order-additionally" &&
      carVariantId &&
      tariffId
    ) {
      handleStatus("order-additionally");
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [location.pathname, addressId, carId, carVariantId, tariffId]);

  //смена текста кнопки
  useEffect(() => {
    if (location.pathname === "/order/order-location") {
      setNavPoint("Выбрать модель");
    } else {
      if (location.pathname === "/order/order-model") {
        setNavPoint("Выбрать параметры аренды автомобиля");
      } else {
        if (location.pathname === "/order/order-additionally") {
          setNavPoint("Подтвердить заказ");
        } else {
          setNavPoint("Забронировать автомобиль");
        }
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
    Api.getTariffs().then((response) => setTariffs(response.data));
    Api.getVariants().then((response) => {
      setVariants(response.data);
      console.log("варианты", response.data);
    });
  }, []);
  useEffect(() => {
    if (location.pathname !== "/order/order-location" && !carId && !addressId) {
      navigate("/order/order-location");
    }
  }, []);
  const handleVariant = (id: IVariant["id"]) => {
    dispatch.order.setVariantId(id);
  };
  const handleContinueButton = () => {
    handleStatusNavigation();
  };
  return (
    <div
      className={`orderReview__container orderReview__container${
        location.pathname === "/order/order-full" ? "--fullPage" : ""
      }`}
    >
      <h2>Ваш заказ</h2>
      <div className="orderReview__car">
        {selectedCar && (
          <>
            <OrderField
              fontSize={"20px"}
              value={`${selectedCar?.brand} ${selectedCar?.model}`}
            />
          </>
        )}
        <div className="orderReview__colorContainer">
          {variantW && (
            <>
              <span>цвет</span>
              <div
                style={{ backgroundColor: "#" + variantW.color }}
                className="orderReview__color"
              ></div>
            </>
          )}{" "}
        </div>
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
        {childChair && (
          <OrderField
            description={"Детское кресло в автомобиле"}
            value={"50 руб"}
          />
        )}
        {carEnsurance && (
          <OrderField description={"КАСКО"} value={"2 руб/мин"} />
        )}
        {lifeEnsurance && (
          <OrderField
            description={"Страхование жизни и здоровья"}
            value={"0,5 руб/мин"}
          />
        )}
      </div>
      <div className="orderReview__variants">
        {currentTariff && <span>Выберите минимальный пакет бронирования</span>}
        {currentTariff &&
          currentTariff?.type === "DAY" &&
          variants!
            .filter((variant) => variant.variant === "ONE_DAY")
            .map((item) => (
              <TariffVariants
                currentVariant={currentVariant}
                handleVariant={handleVariant}
                variantId={item.id}
                variant={item.variant}
              />
            ))}
        {currentTariff &&
          currentTariff?.type === "MINUTE" &&
          variants!
            .filter((variant) => variant.variant !== "ONE_DAY")
            .map((item) => (
              <TariffVariants
                currentVariant={currentVariant}
                handleVariant={handleVariant}
                variantId={item.id}
                variant={item.variant}
              />
            ))}
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
        text={navPoint}
        onClick={handleContinueButton}
      />
    </div>
  );
};
