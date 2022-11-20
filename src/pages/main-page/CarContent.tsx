import { memo, useEffect, useState } from "react";
import { CarCard } from "../../components/CarCard";
import { DotsFlashing } from "../../components/loading/DotsFlashing";
import { ICar } from "../../interfaces/car";
import { Api } from "../../services/api.service";
import "./styles.scss";

export const CarContent = memo(() => {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    Api.getCars().then((response) => {
      setCars(response.data);
      console.log(response.data);
    });
    console.log("render");
  }, []);

  return (
    <div className='slider'>
      {cars.length ? <CarCard cars={cars} /> : <DotsFlashing />}
    </div>
  );
});
