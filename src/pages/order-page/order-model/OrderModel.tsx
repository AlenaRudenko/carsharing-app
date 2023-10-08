import { useEffect, useState } from "react";
import { Api } from "./../../../services/api.service";
import "./styles.scss";
import { ICar } from "../../../interfaces/car";
import { batch, useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";

interface IState {
  cars: ICar[];
}

export const OrderModel = () => {
  const [cars, setCars] = useState<IState["cars"]>([]);

  useEffect(() => {
    Api.getCars().then((response) =>
      setCars((prevState) => [...prevState, ...response.data])
    );
  }, []);

  const selectedCarId = useSelector((state: RootState) => state.order.carId);

  const dispatch = useDispatch<Dispatch>();

  //помещение в редакс id машины
  const handleCurrentCar = (car: ICar) => {
    dispatch.order.setCarId(car.id);
  };

  return (
    <>
      <div className='orderModel-container'>
        <div className='orderModel-container__content'>
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => {
                handleCurrentCar(car);
              }}
              className={`orderModel-container__item ${
                car.id === selectedCarId
                  ? "orderModel-container__item--active"
                  : ""
              }`}
            >
              <span>{car.brand}</span>
              <span>{car.model}</span>
              <div className='orderModel-container__carPic'>
                <img
                  src={`https://api.need-for-drive.ru/${car.variants[1].imageUrl}`}
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
