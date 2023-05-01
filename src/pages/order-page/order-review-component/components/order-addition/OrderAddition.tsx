import { OrderField } from "../OrderField";
import { ITariff } from "../../../../../interfaces/tariffs";
import "./styles.scss";
import { Fragment, useEffect } from "react";
import { AppTable } from "../../../../../components/app-table/AppTable";
import { useLocation } from "react-router";

interface IProps {
  duration: number;
  servicesOrder: IService[];
  currentTariff: ITariff;
  carEnsurance?: boolean;
  lifeEnsurance?: boolean;
  childChair?: boolean;
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
  duration,
  servicesOrder,
  childChair,
  carEnsurance,
  lifeEnsurance,
  currentTariff,
}: IProps) => {
  const location = useLocation();
  const childChairTariffsDay = servicesOrder
    .find((item: IService) => item.title === "Детское кресло")
    ?.tariffs.find((tariff: ITariffOptions) => tariff.tariff === "day")?.price;
  const carEnsuranceTariffsDay = servicesOrder
    .find((item) => item.title === "КАСКО")
    ?.tariffs.find((tariff) => tariff.tariff === "day")?.price;
  const lifeEnsuranceTariffsDay = servicesOrder
    .find((item) => item.title === "Страхование жизни и здоровья")
    ?.tariffs.find((tariff) => tariff.tariff === "day")?.price;
  const childChairTariffsMin = servicesOrder
    .find((item) => item.title === "Детское кресло")
    ?.tariffs.find((tariff) => tariff.tariff === "min")?.price;
  const carEnsuranceTariffsMin = servicesOrder
    .find((item) => item.title === "КАСКО")
    ?.tariffs.find((tariff) => tariff.tariff === "min")?.price;
  const lifeEnsuranceTariffsMin = servicesOrder
    .find((item) => item.title === "Страхование жизни и здоровья")
    ?.tariffs.find((tariff) => tariff.tariff === "min")?.price;

  return (
    <div className='addition__container'>
      {childChair && (
        <AppTable
          title={"Детское кресло"}
          value1={
            currentTariff.type === "DAY"
              ? `${childChairTariffsDay} руб/сутки`
              : `${childChairTariffsMin} руб/за поездку`
          }
          value2={
            currentTariff.type === "DAY"
              ? `${childChairTariffsDay! * duration} руб`
              : `${childChairTariffsMin} руб`
          }
        />
      )}

      {lifeEnsurance && (
        <AppTable
          title={"Страхование жизни и здоровья"}
          value1={
            currentTariff.type === "DAY"
              ? `${lifeEnsuranceTariffsDay} руб/сутки`
              : `${lifeEnsuranceTariffsDay} руб/мин`
          }
          value2={
            currentTariff.type === "DAY"
              ? `${lifeEnsuranceTariffsDay! * duration} руб`
              : `${lifeEnsuranceTariffsMin! * duration} руб`
          }
        />
      )}

      {carEnsurance && (
        <AppTable
          title={"КАСКО"}
          value1={
            currentTariff.type === "DAY"
              ? `${carEnsuranceTariffsDay} руб/сутки`
              : `${carEnsuranceTariffsMin} руб/мин`
          }
          value2={
            currentTariff.type === "DAY"
              ? `${carEnsuranceTariffsDay! * duration} руб`
              : `${carEnsuranceTariffsMin! * duration} руб`
          }
        />
      )}
    </div>
  );
};
