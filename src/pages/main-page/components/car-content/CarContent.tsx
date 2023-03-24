import { memo, useEffect, useState } from "react";
import { CarCard } from "../car-card/CarCard";
import { DotsFlashing } from "../../../../components/loading/DotsFlashing";
import { ICar } from "../../../../interfaces/car";
import { Api } from "../../../../services/api.service";
import "./style.scss";

export const CarContent = memo(() => {
  const [cars, setCars] = useState<ICar[]>([]);

  //получение автомобилей с сервера
  useEffect(() => {
    Api.getCars().then((response) => {
      setCars(response.data);
    });
  }, []);

  return (
    <div className='slider'>
      {cars.length ? <CarCard cars={cars} /> : <DotsFlashing />}
    </div>
  );
});
