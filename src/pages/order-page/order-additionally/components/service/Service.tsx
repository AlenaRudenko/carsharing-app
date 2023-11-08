import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../../../../store/store";
import { useEffect, useState, useCallback } from "react";
import { servicesOrder } from "../../../data/orderData";
import { ServiceItem } from "./service-item/ServiceItem";
import { Api } from "../../../../../services/api.service";
import { ITariff } from "../../../../../interfaces/tariffs";
import "./styles.scss";

export const Service = () => {
  const [tariffs, setTariffs] = useState<ITariff[]>([]);

  const dispatch = useDispatch<Dispatch>();
  console.log(tariffs, "TARIFF");
  const childChair = useSelector((state: RootState) => state.order.childChair);
  const carEnsurance = useSelector(
    (state: RootState) => state.order.carEnsurance,
  );
  const lifeEnsurance = useSelector(
    (state: RootState) => state.order.lifeEnsurance,
  );
  const currentTariffId = useSelector(
    (state: RootState) => state.order.tariffId,
  );

  useEffect(() => {
    Api.getTariffs().then((res) => setTariffs((prevState) => res.data));
  }, []);

  const currentTariff = tariffs.find((item) => item.id === currentTariffId);

  //toggle доп сервисов
  const handleService = useCallback((title: string) => {
    return title === "childChair"
      ? dispatch.order.toggleChildChair()
      : title === "lifeEnsurance"
      ? dispatch.order.toggleLifeEnsurance()
      : dispatch.order.toggleCarEnsurance();
  }, []);
  return (
    <div className="service-container">
      <h3>Выберите дополнительные услуги</h3>
      <div className="service-container__services">
        {servicesOrder.map((service) => (
          <ServiceItem
            key={service.id}
            currentTariff={currentTariff}
            carEnsurance={carEnsurance}
            lifeEnsurance={lifeEnsurance}
            childChair={childChair}
            handleService={handleService}
            service={service}
          />
        ))}
      </div>
    </div>
  );
};
