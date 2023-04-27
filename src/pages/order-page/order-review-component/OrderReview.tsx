import { useNavigate, useLocation } from "react-router-dom";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../../store/store";
import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { OrderField } from "./components/OrderField";
import { EquipmentComponent } from "./components/equipment/EquipmentComponent";
import { ITariff } from "../../../interfaces/tariffs";
import { IVariant } from "../../../interfaces/variant";
import { TEvent } from "../../../interfaces/event";
import { TariffOptions } from "./components/tariff-options/TariffOptions";
import { TariffVariants } from "./components/tariff-variants/TariffVariants";
import { OrderTime } from "./components/order-time/OrderTime";
import { OrderAddition } from "./components/order-addition/OrderAddition";

interface IProps {
  services: IService[];
  cars: ICar[];
  tariffs: ITariff[];
  variants: IVariant[];
  addresses: IAddresses[];
  handleStatusNavigation: () => void;
  handleStatus: (status: string) => void;
}
interface IService {
  id: string;
  title: string;
  descrintion: string;
  tariffs: ITariffOptions[];
}
interface ITariffOptions {
  price: number;
  tariff: string;
}

interface IState {
  isDisabled: boolean;
  navPoint: string;
  startsAtDate: string;
  endsAtDate: string;
  startsAtTime: string;
  endsAtTime: string;
}
interface IAddresses {
  name: string;
  id: string;
}
export const OrderReview = ({
  services,
  cars,
  tariffs,
  variants,
  addresses,
  handleStatusNavigation,
  handleStatus,
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState<IState["isDisabled"]>(false);
  const [navPoint, setNavPoint] = useState<IState["navPoint"]>("");

  const carId = useSelector((state: RootState) => state.order.carId);
  const cityId = useSelector((state: RootState) => state.order.cityId);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const carVariantId = useSelector(
    (state: RootState) => state.order.carVariantId
  );
  const tariffId = useSelector((state: RootState) => state.order.tariffId);
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

  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const equipments = ["Удаленный прогрев", "Бортовой компьютер", "Полный бак"];

  const selectedCar = useMemo(() => {
    return cars?.find((car) => car.id === carId);
  }, [cars, carId]);

  const selectedAddress = addresses?.find((item) => item.id === addressId);
  const selectedCarVariant = selectedCar?.variants.find(
    (item) => item.id === carVariantId
  );
  const currentTariff = tariffs?.find((tariff) => tariff.id === tariffId);
  const selectedVariant = variants?.find((item) => item.id === currentVariant);
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

  //сброс всего к началу заказа после одновления и возврат на страницу выбора пункта выдачи
  useEffect(() => {
    if (location.pathname !== "/order/order-location" && !carId && !addressId) {
      navigate("/order/order-location");
    }
  }, []);

  //переход на следующий уровень бронирования
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
          {selectedCarVariant && (
            <>
              <span>цвет</span>
              <div
                style={{ backgroundColor: "#" + selectedCarVariant.color }}
                className="orderReview__color"
              ></div>
            </>
          )}{" "}
        </div>
      </div>
      <div className="orderReview__additional">
        {selectedCar && (
          <div className="equipment">
            {equipments.map((item) => (
              <EquipmentComponent key={item} text={item} />
            ))}
          </div>
        )}
        {currentTariff && (
          <TariffOptions
            selectedVariant={selectedVariant}
            currentTariff={currentTariff}
          />
        )}
        <OrderAddition
          services={services}
          childChair={childChair}
          carEnsurance={carEnsurance}
          lifeEnsurance={lifeEnsurance}
        />
      </div>

      <div className="orderReview__dateTime">
        {currentTariff && (
          <OrderTime
            tariffs={tariffs}
            variants={variants}
            currentTariff={currentTariff}
            currentVariant={currentVariant}
          />
        )}
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
