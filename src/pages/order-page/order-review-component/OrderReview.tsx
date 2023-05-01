import { useNavigate, useLocation } from "react-router-dom";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import { ICar } from "../../../interfaces/car";
import { OrderField } from "./components/OrderField";
import { EquipmentComponent } from "./components/equipment/EquipmentComponent";
import { ITariff } from "../../../interfaces/tariffs";
import { IVariant } from "../../../interfaces/variant";

import { TariffOptions } from "./components/tariff-options/TariffOptions";

import { OrderAddition } from "./components/order-addition/OrderAddition";
import { AppTable } from "../../../components/app-table/AppTable";
import { HelpModal } from "../../../components/help-modal/HelpModal";

interface IProps {
  currentTariff: ITariff;
  duration: number;
  servicesOrder: IService[];
  cars: ICar[];
  addresses: IAddresses[];
  handleStatusNavigation: () => void;
  handleStatus: (status: string) => void;
  daysNaming: () => void;
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
  duration,
  currentTariff,
  servicesOrder,
  cars,
  daysNaming,
  addresses,
  handleStatusNavigation,
  handleStatus,
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState<IState["isDisabled"]>(false);
  const [navPoint, setNavPoint] = useState<IState["navPoint"]>("");
  const [orderPrice, setOrderPrice] = useState(0);

  const carId = useSelector((state: RootState) => state.order.carId);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const carVariantId = useSelector(
    (state: RootState) => state.order.carVariantId
  );

  const childChair = useSelector((state: RootState) => state.order.childChair);
  const carEnsurance = useSelector(
    (state: RootState) => state.order.carEnsurance
  );

  const lifeEnsurance = useSelector(
    (state: RootState) => state.order.lifeEnsurance
  );
  const startsAt = useSelector((state: RootState) => state.order.startsAt);
  const endsAt = useSelector((state: RootState) => state.order.endsAt);

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
      currentTariff &&
      startsAt &&
      endsAt
    ) {
      handleStatus("order-additionally");
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [
    location.pathname,
    addressId,
    carId,
    carVariantId,
    currentTariff,
    startsAt,
    endsAt,
  ]);

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
  }, [location, carId, addressId, navigate]);
  // useEffect(() => {
  //   if (location.pathname === "/order/order-full") {
  //     if (currentTariff?.type === "DAY") {
  //       setOrderPrice(orderPrice + currentTariff.price * duration);
  //       if (childChair) {
  //         const price = servicesOrder
  //           .find((service) => service.id === "childChair")
  //           ?.tariffs.find((tariff) => tariff.tariff === "day")?.price;
  //         setOrderPrice(orderPrice + price! * dayDuration);
  //       }
  //       if (lifeEnsurance) {
  //         const price = servicesOrder
  //           .find((service) => service.id === "lifeEnsurance")
  //           ?.tariffs.find((tariff) => tariff.tariff === "day")?.price;
  //         setOrderPrice(orderPrice + price! * dayDuration);
  //       }
  //       if (carEnsurance) {
  //         const price = servicesOrder
  //           .find((service) => service.id === "carEnsurance")
  //           ?.tariffs.find((tariff) => tariff.tariff === "day")?.price;
  //         setOrderPrice(orderPrice + price! * dayDuration);
  //       }
  //     } else {
  //       if (currentTariff?.type === "MINUTE") {
  //         setOrderPrice(orderPrice + currentTariff.price * minDuration);
  //         if (childChair) {
  //           const price = servicesOrder
  //             .find((service) => service.id === "childChair")
  //             ?.tariffs.find((tariff) => tariff.tariff === "min")?.price;
  //           setOrderPrice(orderPrice + price!);
  //         }
  //         if (lifeEnsurance) {
  //           const price = servicesOrder
  //             .find((service) => service.id === "lifeEnsurance")
  //             ?.tariffs.find((tariff) => tariff.tariff === "min")?.price;
  //           setOrderPrice(orderPrice + price! * minDuration);
  //         }
  //         if (carEnsurance) {
  //           const price = servicesOrder
  //             .find((service) => service.id === "carEnsurance")
  //             ?.tariffs.find((tariff) => tariff.tariff === "min")?.price;
  //           setOrderPrice(orderPrice + price! * minDuration);
  //         }
  //       }
  //     }
  //   } else {
  //     setOrderPrice(0);
  //   }
  // }, [location]);

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
      <div className='orderReview__car'>
        {selectedCar && (
          <>
            <OrderField
              fontSize={"20px"}
              value={`${selectedCar?.brand} ${selectedCar?.model}`}
            />
          </>
        )}
        <div className='orderReview__colorContainer'>
          {selectedCarVariant && (
            <>
              <span>цвет</span>
              <div
                style={{ backgroundColor: "#" + selectedCarVariant.color }}
                className='orderReview__color'
              ></div>
            </>
          )}{" "}
        </div>
      </div>
      <div className='orderReview__additional'>
        {selectedCar && (
          <div className='equipment'>
            {equipments.map((item) => (
              <EquipmentComponent key={item} text={item} />
            ))}
          </div>
        )}
        {currentTariff && (
          <TariffOptions duration={duration} currentTariff={currentTariff} />
        )}
        {currentTariff && (
          <OrderAddition
            duration={duration}
            currentTariff={currentTariff}
            servicesOrder={servicesOrder}
            childChair={childChair}
            carEnsurance={carEnsurance}
            lifeEnsurance={lifeEnsurance}
          />
        )}
      </div>
      <div className='orderReview__duration'>
        {currentTariff &&
          startsAt &&
          endsAt &&
          currentTariff.type === "MINUTE" && <span>{`${daysNaming()}`}</span>}
        {currentTariff &&
          startsAt &&
          endsAt &&
          currentTariff.type === "DAY" && (
            <div className='orderReview__helpContainer'>
              <div className='orderReview__help'>
                <span>{`${daysNaming()}`}</span>{" "}
                <HelpModal
                  fontSize='13px'
                  descrintion={
                    'В тарифе "Суточный" одна минута считается за полные сутки, тем самым вы бронируете авто на все сутки'
                  }
                />
              </div>
            </div>
          )}
      </div>
      <div className='orderReview__pickPoint'>
        {selectedAddress && (
          <AppTable
            title={"пункт выдачи автомобиля:"}
            value2={selectedAddress?.name}
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
