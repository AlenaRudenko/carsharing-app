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
import { TEvent } from "../../../interfaces/event";
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
  const [startsAtDate, setStartsAtDate] = useState(
    new Date().toJSON().slice(0, 10)
  );
  const [endsAtDate, setEndsAtDate] = useState("");
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
  const handleVariant = (variant: IVariant) => {
    dispatch.order.setVariantId(variant.id);
    switch (variant.variant) {
      case "ONE_DAY": {
        let newDateState = new Date(startsAtDate);
        let newDate = new Date(
          Date.UTC(
            newDateState.getFullYear(),
            newDateState.getMonth(),
            newDateState.getDate() + 1
          )
        );
        setEndsAtDate(newDate.toJSON().slice(0, 10));
        console.log("?????????", startsAtDate);
        console.log("!!!!!!!!!!!!!!!", newDate.toJSON().slice(0, 10));
      }
    }
  };
  const handleContinueButton = () => {
    handleStatusNavigation();
  };
  const handleDataPickerStart = (e: TEvent) => {
    setStartsAtDate(e.target.value);
  };
  useEffect(() => {
    let day2 = new Date(endsAtDate);
    let day1 = new Date(startsAtDate);
    let diff = Math.abs(day2.getTime() - day1.getTime());
    let daysRange = Math.ceil(diff / (1000 * 3600 * 24));
    if (daysRange === 1) {
      let currVariant = variants?.find((item) => item.variant === "ONE_DAY");
      dispatch.order.setVariantId(currVariant!.id);
      console.log("РАБОАТЕТ", daysRange);
    } else
      console.log(
        "НЕ РАБОАТЕТ",
        daysRange,
        "последний день",
        day2,
        "первый день",
        day1
      );
  }, [endsAtDate]);
  useEffect(() => {});
  const handleDataPickerEnd = (e: TEvent) => {
    setEndsAtDate(e.target.value);
    dispatch.order.removeVariantId();
  };
  useEffect(() => {
    let year = new Date(startsAtDate).getFullYear();
    let month = new Date(startsAtDate).getMonth();
    let day = new Date(startsAtDate).getDate();
    let endYear = new Date(endsAtDate).getFullYear();
    let endMonth = new Date(endsAtDate).getMonth();
    let endDay = new Date(endsAtDate).getDate();
    if (year > endYear) {
      return setEndsAtDate("");
    } else {
      if (month > endMonth) {
        return setEndsAtDate("");
      } else {
        if (day >= endDay) {
          return setEndsAtDate("");
        }
      }
    }
  }, [startsAtDate]);
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
      <div className="orderReview__dateTime">
        {currentTariff && currentTariff?.type === "DAY" && (
          <>
            <input
              key={"start"}
              type="date"
              id="start"
              min={new Date().toJSON().slice(0, 10)}
              max={new Date(
                Date.UTC(new Date(startsAtDate).getFullYear(), 11, 31)
              )
                .toJSON()
                .slice(0, 10)}
              value={startsAtDate}
              onChange={handleDataPickerStart}
            />
            {/* <input type="time" /> */}
            <input
              key={"end"}
              id="end"
              type="date"
              min={new Date(
                Date.UTC(
                  new Date(startsAtDate).getFullYear(),
                  new Date(startsAtDate).getMonth(),
                  new Date(startsAtDate).getDate() + 1
                )
              )
                .toJSON()
                .slice(0, 10)}
              max={new Date(
                Date.UTC(new Date(startsAtDate).getFullYear() + 1, 0, 1)
              )
                .toJSON()
                .slice(0, 10)}
              value={endsAtDate}
              onChange={handleDataPickerEnd}
            />
            {/* <input type="time" /> */}
          </>
        )}
      </div>
      <div className="orderReview__variants">
        {currentTariff && (
          <span>или выберите минимальный пакет бронирования</span>
        )}
        {currentTariff &&
          currentTariff?.type === "DAY" &&
          variants!
            .filter((variant) => variant.variant === "ONE_DAY")
            .map((item) => (
              <TariffVariants
                key={item.id}
                currentVariant={currentVariant}
                handleVariant={handleVariant}
                variantId={item.id}
                variant={item}
              />
            ))}
        {currentTariff &&
          currentTariff?.type === "MINUTE" &&
          variants!
            .filter((variant) => variant.variant !== "ONE_DAY")
            .map((item) => (
              <TariffVariants
                key={item.id}
                currentVariant={currentVariant}
                handleVariant={handleVariant}
                variantId={item.id}
                variant={item}
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
