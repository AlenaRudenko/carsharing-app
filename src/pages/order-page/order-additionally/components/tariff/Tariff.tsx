import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import { TariffItem } from "./tariff-item/TariffItem";
import { ITariff } from "../../../../../interfaces/tariffs";
import { Api } from "../../../../../services/api.service";
import { RootState, Dispatch } from "../../../../../store/store";

interface IState {
  textParams: IText;
}
export interface IText {
  fontSize: string;
  marginBottom: string;
  priceSize: string;
  headlingSize: string;
}
export const Tariff = () => {
  const [textParams, setTextParams] = useState<IState["textParams"]>({
    fontSize: "small",
    marginBottom: "10px",
    priceSize: "xx-small",
    headlingSize: "10px",
  });
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
  useEffect(() => {
    Api.getTariffs().then((response) => setTariffs(response.data));
  }, []);
  useEffect(() => {
    document.documentElement.clientWidth < 992
      ? setTextParams((prevState) => ({
          ...prevState,
          fontSize: "x-small",
          marginBottom: "5px",
          priceSize: "small",
          headlingSize: "12px",
        }))
      : document.documentElement.clientWidth < 1350
      ? setTextParams((prevState) => ({
          ...prevState,
          fontSize: "small",
          marginBottom: "3px",
          priceSize: "medium",
          headlingSize: "20px",
        }))
      : setTextParams((prevState) => ({
          ...prevState,
          fontSize: "small",
          marginBottom: "6px",
          priceSize: "large",
          headlingSize: "20px",
        }));
  }, []);
  return (
    <div className="tariff-container">
      <h3>Выберите тариф</h3>
      <h2></h2>
      <div className="tariff-container__list">
        {tariffs.map((tariff) => (
          <TariffItem key={tariff.id} {...{ tariff, textParams }} />
        ))}
      </div>
    </div>
  );
};
