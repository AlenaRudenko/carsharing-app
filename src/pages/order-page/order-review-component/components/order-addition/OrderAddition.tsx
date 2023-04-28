import { OrderField } from "../OrderField";
import { ITariff } from "../../../../../interfaces/tariff";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

interface IProps {
  duration: number;
  services: IService[];
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
  services,
  childChair,
  carEnsurance,
  lifeEnsurance,
  currentTariff,
}: IProps) => {
  const childChairTariffsDay = services
    .find((item) => item.title === "Детское кресло")
    .tariffs.find((tariff) => tariff.tariff === "day").price;
  const carEnsuranceTariffsDay = services
    .find((item) => item.title === "КАСКО")
    .tariffs.find((tariff) => tariff.tariff === "day").price;
  const lifeEnsuranceTariffsDay = services
    .find((item) => item.title === "Страхование жизни и здоровья")
    .tariffs.find((tariff) => tariff.tariff === "day").price;
  const childChairTariffsMin = services
    .find((item) => item.title === "Детское кресло")
    .tariffs.find((tariff) => tariff.tariff === "min").price;
  const carEnsuranceTariffsMin = services
    .find((item) => item.title === "КАСКО")
    .tariffs.find((tariff) => tariff.tariff === "min").price;
  const lifeEnsuranceTariffsMin = services
    .find((item) => item.title === "Страхование жизни и здоровья")
    .tariffs.find((tariff) => tariff.tariff === "min").price;
  return (
    <>
      {childChair && (
        <OrderField
          description={"Детское кресло"}
          amount={
            currentTariff.type === "DAY"
              ? `${childChairTariffsDay * duration} руб`
              : `${childChairTariffsMin} руб`
          }
          value={
            currentTariff.type === "DAY"
              ? `${childChairTariffsDay} руб/сутки`
              : `${childChairTariffsMin} руб/за поездку`
          }
        />
      )}
      {lifeEnsurance && (
        <OrderField
          description={"Страхование жизни и здоровья"}
          amount={
            currentTariff.type === "DAY"
              ? `${lifeEnsuranceTariffsDay * duration} руб`
              : `${lifeEnsuranceTariffsMin * duration} руб`
          }
          value={
            currentTariff.type === "DAY"
              ? `${lifeEnsuranceTariffsDay} руб/сутки`
              : `${lifeEnsuranceTariffsDay} руб/мин`
          }
        />
      )}
      {carEnsurance && (
        <OrderField
          description={"КАСКО"}
          amount={
            currentTariff.type === "DAY"
              ? `${carEnsuranceTariffsDay * duration} руб`
              : `${carEnsuranceTariffsMin * duration} руб`
          }
          value={
            currentTariff.type === "DAY"
              ? `${carEnsuranceTariffsDay} руб/сутки`
              : `${carEnsuranceTariffsMin} руб/мин`
          }
        />
      )}
    </>
  );
};
