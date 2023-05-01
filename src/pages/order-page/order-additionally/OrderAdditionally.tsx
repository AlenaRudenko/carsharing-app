import { useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { ICarVariant } from "../../../interfaces/car-variant";
import "./styles.scss";
import { Colors } from "./components/Colors";
import { ITariff } from "../../../interfaces/tariffs";
import { Tariff } from "./components/tariff/Tariff";
import { Service } from "./components/service/Service";

interface IProps {
  services: IService[];
  tariffs: ITariff[];
  cars: ICar[];
}

interface IService {
  id: string;
  title: string;
  descrintion: string;
  tariffs: ITariffOptions[];
}
interface ITariffOptions {
  price: number;
  tariff: string;
}

export const OrderAdditionally = ({ cars, tariffs, services }: IProps) => {
  const [currentServices, setCurrentServices] = useState<string[]>(
    [] as string[]
  );
  const dispatch = useDispatch<Dispatch>();

  const currentCarId = useSelector((state: RootState) => state.order.carId);
  const currentVariantId = useSelector(
    (state: RootState) => state.order.carVariantId
  );
  const currentTariffId = useSelector(
    (state: RootState) => state.order.tariffId
  );
  const childChair = useSelector((state: RootState) => state.order.childChair);
  const carEnsurance = useSelector(
    (state: RootState) => state.order.carEnsurance
  );
  const lifeEnsurance = useSelector(
    (state: RootState) => state.order.lifeEnsurance
  );

  const selectedCar = useMemo(() => {
    return cars.find((car) => car.id === currentCarId);
  }, [cars, currentCarId]);

  //сет варианта автомобиля цвет
  const handleCurrentVariant = (variant: ICarVariant["id"]) => {
    return dispatch.order.setCarVariantId(variant);
  };
  //выбор и сет тарифа в редакс
  const handleTariff = (tariff: ITariff) => {
    currentTariffId !== tariff.id && dispatch.order.setTariffId(tariff.id);
  };

  //toggle доп сервисов
  const handleSetServices = (title: string) => {
    return title === "Детское кресло"
      ? dispatch.order.toggleChildChair()
      : title === "Страхование жизни и здоровья"
      ? dispatch.order.toggleLifeEnsurance()
      : dispatch.order.toggleCarEnsurance();
  };

  return (
    <>
      <div className='orderAdd__container'>
        <h3>Выберите цвет автомобиля</h3>
        <div className='colors__block'>
          <div className='currentCar__reviewColorsContainer'>
            {selectedCar?.variants.map((variant) => (
              <Colors
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
        <h3>Выберите тариф</h3>
        <div className='orderAdd__tariffs'>
          {tariffs.map((tariff) => (
            <Tariff
              key={tariff.id}
              currentTariffId={currentTariffId}
              tariff={tariff}
              handleTariff={handleTariff}
            />
          ))}
        </div>
        <h3>Выберите дополнительные услуги</h3>
        <div className='orderAdd__services'>
          {currentTariffId &&
            services.map((service) => (
              <Service
                allTariffs={tariffs}
                carEnsurance={carEnsurance}
                lifeEnsurance={lifeEnsurance}
                childChair={childChair}
                handleService={handleSetServices}
                key={service.title}
                id={service.id}
                title={service.title}
                descrintion={service.descrintion}
                tariffs={service.tariffs}
              />
            ))}
        </div>
      </div>
    </>
  );
};
