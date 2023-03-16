import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useMemo, useState } from "react";
import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { ICarVariant } from "../../../interfaces/car-variant";
import "./styles.scss";
import { Colors } from "./components/Colors";
import { OrderReview } from "../order-review-component/OrderReview";
import { ITariff } from "../../../interfaces/tariffs";

export const OrderAdditionally = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
  const [currentColor, setCurrentColor] = useState<ICarVariant["id"]>("");
  const currentCarId = useSelector((state: RootState) => state.order.carId);

  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
    Api.getTariffs().then((response) => setTariffs(response.data));
  }, []);
  const selectedCar = useMemo(() => {
    return cars.find((car) => car.id === currentCarId);
  }, [cars, currentCarId]);

  const handleCurrentVariant = (variant: ICarVariant["id"]) => {
    setCurrentColor(variant);
  };

  return (
    <>
      <div className='orderAdd__container'>
        <div className='colors__block'>
          <span>Выберите цвет автомобиля</span>{" "}
          <div className='currentCar__reviewColorsContainer'>
            {selectedCar?.variants.map((variant) => (
              <Colors
                variantColor={variant.color}
                variant={variant.id}
                currentColor={currentColor}
                handleCurrentVariant={handleCurrentVariant}
              />
            ))}
          </div>
        </div>
        <div className='orderAdd__tariffs'>
          {tariffs.map((tariff) => {
            return <span>{tariff.price}</span>;
          })}
        </div>
      </div>
    </>
  );
};
