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
import { servicesOrder } from "../data/orderData";
import { TariffOptions } from "./components/tariff-options/TariffOptions";
import { OrderAddition } from "./components/order-addition/OrderAddition";
import { AppTable } from "../../../components/app-table/AppTable";
import { HelpModal } from "../../../components/help-modal/HelpModal";
import { TPath } from "../../main-page/MainContent";
import { daysNaming } from "../../../functions/getTimeNaming";
import { addresses, IAddress } from "../data/orderAddresses";
import { Api } from "../../../services/api.service";

interface IProps {
  handleNavigation: () => void;
  handleConfirmedOrderPaths: (path: TPath) => void;
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
  duration: number;
}

export const OrderReview = ({
  handleNavigation,
  handleConfirmedOrderPaths,
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState<IState["isDisabled"]>(false);
  const [navPoint, setNavPoint] = useState<IState["navPoint"]>("");
  const [cars, setCars] = useState<ICar[]>([]);
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const carId = useSelector((state: RootState) => state.order.carId);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const carVariantId = useSelector(
    (state: RootState) => state.order.carVariantId,
  );
  const childChair = useSelector((state: RootState) => state.order.childChair);
  const carEnsurance = useSelector(
    (state: RootState) => state.order.carEnsurance,
  );

  const lifeEnsurance = useSelector(
    (state: RootState) => state.order.lifeEnsurance,
  );
  const startsAt = useSelector((state: RootState) => state.order.startsAt);
  const endsAt = useSelector((state: RootState) => state.order.endsAt);
  const currentTariffId = useSelector(
    (state: RootState) => state.order.tariffId,
  );
  const currentTariff = tariffs.find((item) => item.id === currentTariffId);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("startsat", startsAt);
    console.log("endsat", endsAt);
  }, [startsAt, endsAt]);
  const equipments = ["Удаленный прогрев", "Бортовой компьютер", "Полный бак"];

  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
    Api.getTariffs().then((response) => setTariffs(response.data));
  }, []);
  const selectedCar = useMemo(() => {
    return cars?.find((car) => car.id === carId);
  }, [cars, carId]);

  const selectedAddress = addresses?.find((item) => item.id === addressId);
  const selectedCarVariant = selectedCar?.variants.find(
    (item) => item.id === carVariantId,
  );

  //смена статуса кнопки и статусов навигации сверху
  useEffect(() => {
    if (location.pathname === "/order/order-location") {
      handleConfirmedOrderPaths({ name: "order-location", index: 1 });
      if (addressId) {
        handleConfirmedOrderPaths({ name: "order-model", index: 2 });
        setIsDisabled(false);
      } else setIsDisabled(true);
    } else if (location.pathname === "/order/order-model" && carId) {
      if (carId) {
        handleConfirmedOrderPaths({ name: "order-additionally", index: 3 });
        setIsDisabled(false);
      } else setIsDisabled(true);
    } else if (
      location.pathname === "/order/order-additionally" &&
      carVariantId &&
      currentTariff &&
      startsAt &&
      endsAt
    ) {
      handleConfirmedOrderPaths({ name: "order-full", index: 4 });
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
  useEffect(() => {
    let day2 = new Date(endsAt);
    let day1 = new Date(startsAt);
    let diff = day2.getTime() - day1.getTime();
    setDuration((prevState) => diff);
    console.log("разница", Math.ceil(diff / 86400000));
  }, [endsAt, startsAt]);
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
      <div className="orderReview__duration">
        {currentTariff &&
          startsAt &&
          endsAt &&
          currentTariff.type === "MINUTE" && (
            <span>{`${daysNaming(currentTariff.type, duration)}`}</span>
          )}
        {currentTariff &&
          startsAt &&
          endsAt &&
          currentTariff.type === "DAY" && (
            <div className="orderReview__helpContainer">
              <div className="orderReview__help">
                <span>{`${daysNaming(currentTariff.type, duration)}`}</span>{" "}
                <HelpModal
                  fontSize="13px"
                  descrintion={
                    'В тарифе "Суточный" одна минута считается за полные сутки, тем самым вы бронируете авто на все сутки'
                  }
                />
              </div>
            </div>
          )}
      </div>
      <div className="orderReview__pickPoint">
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
        onClick={handleNavigation}
      />
    </div>
  );
};
