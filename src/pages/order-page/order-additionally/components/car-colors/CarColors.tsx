import { ICar } from "../../../../../interfaces/car";
import { Color } from "./color/Color";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../../../../store/store";
import "./styles.scss";
import { useCallback, useState, useEffect, useMemo } from "react";
import { Api } from "../../../../../services/api.service";

export const CarColors = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
  }, []);

  const dispatch = useDispatch<Dispatch>();
  const currentCarId = useSelector((state: RootState) => state.order.carId);
  const currentVariantId = useSelector(
    (state: RootState) => state.order.carVariantId,
  );
  
  const selectedCar = useMemo(() => {
    return cars.find((car) => car.id === currentCarId);
  }, [cars, currentCarId]);

  const handleCurrentVariant = useCallback((variantId: string) => {
    return dispatch.order.setCarVariantId(variantId);
  }, []);

  return (
    <div className="carColors">
      <h3>Выберите цвет автомобиля</h3>
      <div className="carColors-container">
        <div className="carColors-container__content">
          {selectedCar?.variants.map((variant) => (
            <Color
              key={variant.id}
              imageUrl={variant.imageUrl}
              variantColor={variant.color}
              variant={variant.id}
              currentVariantId={currentVariantId}
              handleCurrentVariant={handleCurrentVariant}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
