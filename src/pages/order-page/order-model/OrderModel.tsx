import { useEffect, useState } from "react";
import { Api } from "./../../../services/api.service";
import "./styles.scss";
import { ICar } from "../../../interfaces/car";
import { batch, useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";

export const OrderModel = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  const selectedCarId = useSelector((state: RootState) => state.order.carId);

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
    Api.getTariffs().then((response) => console.log(response.data));
  }, []);

  const handleCurrentCar = (car: ICar) => {
    batch(() => {
      dispatch.order.setCarId(car.id);
    });
  };

  return (
    <>
      <div className='orderModel__container'>
        <div className='orderModel__car'>
          {cars.map((car, index) => (
            <div
              onClick={() => {
                handleCurrentCar(car);
              }}
              className={`car__item ${
                car.id === selectedCarId ? "car__item--active" : ""
              }`}
            >
              <span>{car.brand}</span>
              <span>{car.model}</span>
              <div className='car__pic'>
                <img
                  src={`https://api.need-car.online/${car.variants[1].imageUrl}`}
                  alt=''
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};