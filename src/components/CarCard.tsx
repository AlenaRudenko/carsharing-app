import { useEffect, useState } from "react";

import { ICar } from "../interfaces/car";
import "./styles.scss";
interface IProps {
  cars: ICar[];
}
export const CarCard = ({ cars }: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      const carsLength = cars.length;
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
  }, [cars]);

  return (
    <div className="carCards__container">
      <div className="carCards__wrapper">
        {cars.map((item, index) => (
          <div key={index}>
            {index === currentIndex && (
              <div className="carCards__item">
                <div className={"carCards__img"}>
                  <img
                    key={item.variants[0].imageUrl}
                    alt={""}
                    src={`https://api.need-car.online/${item.variants[0].imageUrl}`}
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
