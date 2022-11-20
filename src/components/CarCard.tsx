import { useEffect, useState } from "react";

import { ICar } from "../interfaces/car";
import "./styles.scss";
interface IProps {
  cars: ICar[];
}
export const CarCard = (props: IProps) => {
  const data = [
    { model: "RIO", brand: "KIA" },
    { model: "i7", brand: "BMW" },
    { model: "Cerato", brand: "KIA" },
    { model: "Largus", brand: "LADA" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      const carsLength = props.cars.length;
      setCurrentIndex((prev) => {
        if (prev === carsLength - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [props.cars]);
  const nextSlide = () => {
    setCurrentIndex(
      currentIndex === props.cars.length - 1 ? 0 : currentIndex + 1
    );
  };
  const prevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? props.cars.length - 1 : currentIndex - 1
    );
  };
  return (
    <div className='carCards__container'>
      <div className='carCards__wrapper'>
        {props.cars.map((item, index) => (
          <div key={index}>
            {index === currentIndex && (
              <div className='carCards__item'>
                <div className={"carCards__img"}>
                  <img
                    alt={""}
                    src={`https://carsharing-api.up.railway.app/${item.variants[0].imageUrl}`}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
