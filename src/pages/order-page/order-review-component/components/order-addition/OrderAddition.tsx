import { OrderField } from "../OrderField";
import { ITariff } from "../../../../../interfaces/tariff";

interface IProps {
  services: IService[];
  currentTariff: ITariff;
  carEnsurance: boolean;
  lifeEnsurance: boolean;
  childChair: boolean;
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

export const OrderAddition = ({
  services,
  childChair,
  carEnsurance,
  lifeEnsurance,
  currentTariff,
}: IProps) => {
  return (
    <>
      {childChair && (
        <OrderField
          description={"Детское кресло в автомобиле"}
          value={
            currentTariff.type === "DAY"
              ? services
                  .find((item) => item.title === "Детское кресло")
                  .tariffs.find((item) => item.tariff === "day").price
              : services
                  .find((item) => item.title === "детское кресло")
                  .tariffs.find((item) => item.tariff === "min").price
          }
        />
      )}
      {carEnsurance && <OrderField description={"КАСКО"} value={"2 руб/мин"} />}
      {lifeEnsurance && (
        <OrderField
          description={"Страхование жизни и здоровья"}
          value={"0,5 руб/мин"}
        />
      )}
    </>
  );
};
