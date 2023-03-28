import { useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { ICarVariant } from "../../../interfaces/car-variant";
import "./styles.scss";
import { Colors } from "./components/Colors";
import { OrderReview } from "../order-review-component/OrderReview";
import { ITariff } from "../../../interfaces/tariffs";
import { Tariff } from "./components/tariff/Tariff";
export const OrderAdditionally = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
  const [currentColor, setCurrentColor] = useState<ICarVariant["id"]>("");
  const [currentTariff, setCurrentTariff] = useState<ITariff["id"]>("");
  const dispatch = useDispatch<Dispatch>();
  const currentCarId = useSelector((state: RootState) => state.order.carId);
  const currentVariantId = useSelector(
    (state: RootState) => state.order.carVariantId
  );
  const currentTariffId = useSelector(
    (state: RootState) => state.order.tariffId
  );
  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
    Api.getTariffs().then((response) => setTariffs(response.data));
  }, []);

  const selectedCar = useMemo(() => {
    return cars.find((car) => car.id === currentCarId);
  }, [cars, currentCarId]);

  const handleCurrentVariant = (variant: ICarVariant["id"]) => {
    setCurrentColor(variant);
    dispatch.order.setCarVariantId(variant);
  };
  const handleTariff = (tariff: ITariff["id"]) => {
    setCurrentTariff(tariff);
    dispatch.order.setTariffId(tariff);
  };
  return (
    <>
      <div className="orderAdd__container">
        <h3>Выберите цвет автомобиля</h3>
        <div className="colors__block">
          <div className="currentCar__reviewColorsContainer">
            {selectedCar?.variants.map((variant) => (
              <Colors
                variantColor={variant.color}
                variant={variant.id}
                currentVariantId={currentVariantId}
                handleCurrentVariant={handleCurrentVariant}
              />
            ))}
          </div>
        </div>
        <h3>Выберите тариф</h3>
        <div className="orderAdd__tariffs">
          {tariffs.map((tariff) => (
            <Tariff
              currentTariffId={currentTariffId}
              id={tariff.id}
              type={tariff.type}
              price={tariff.price}
              handleTariff={handleTariff}
            />
          ))}
        </div>
      </div>
    </>
  );
};
