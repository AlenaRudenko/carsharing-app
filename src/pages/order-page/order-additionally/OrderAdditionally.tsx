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
import { Service } from "./components/service/Service";
import { Test } from "./Test";

export const OrderAdditionally = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
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

  useEffect(() => {
    Api.getCars().then((response) => setCars(response.data));
  }, []);

  useEffect(() => {
    Api.getTariffs().then((response) => setTariffs(response.data));
  }, []);

  const services = [
    {
      id: "1",
      title: "Детское кресло",
      descrintion: "Кресло подходит для перевозки детей весом от 9 до 36 кг",
      price: 50,
      tariff: "fix",
    },
    {
      id: "2",
      title: "Страхование жизни и здоровья",
      descrintion:
        "Действует в случае травм, инвалидности или смерти застрахованного. Застрахованными считаются все пассажиры (если их количество не превышает вместимость транспорта)",
      price: 0.5,
      tariff: "min",
    },
    {
      id: "3",
      title: "КАСКО",
      descrintion:
        "КАСКО помогает сократить размер выплаты, если водитель виновен в аварии. Если авария произошла по вине пользователя или виновное лицо не установлено, то пользователь возмещает реальный ущерб, но не более 30 000 ₽",
      price: 2,
      tariff: "min",
    },
  ];

  const selectedCar = useMemo(() => {
    return cars.find((car) => car.id === currentCarId);
  }, [cars, currentCarId]);

  const handleCurrentVariant = (variant: ICarVariant["id"]) => {
    dispatch.order.setCarVariantId(variant);
  };
  //выбор и сет тарифа в редакс
  const handleTariff = (tariff: ITariff["id"]) => {
    dispatch.order.setTariffId(tariff);
  };

  const handleService = (title: string) => {
    console.log("title", title);
    console.log("currentServices", currentServices);
    if (currentServices.includes(title)) {
      setCurrentServices([...currentServices.filter((item) => item !== title)]);
    } else setCurrentServices((prevState) => [...prevState, title]);
    console.log("шо осталось", currentServices);
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
              id={tariff.id}
              type={tariff.type}
              price={tariff.price}
              handleTariff={handleTariff}
            />
          ))}
        </div>
        <h3>Выберите дополнительные услуги</h3>
        <div className='orderAdd__services'>
          {services.map((service) => (
            <Service
              currentServices={currentServices}
              handleService={handleService}
              key={service.title}
              id={service.id}
              title={service.title}
              descrintion={service.descrintion}
              price={service.price}
              tariff={service.tariff}
            />
          ))}
        </div>
      </div>
    </>
  );
};
