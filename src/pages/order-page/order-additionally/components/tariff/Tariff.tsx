import { useEffect, useState } from "react";
import "./styles.scss";
import { TariffContent } from "./TariffContent";

interface IProps {
  id: string;
  type: string;
  price: number;
  currentTariffId: string;
  handleTariff: (id: string) => void;
}
interface IState {
  textParams: IText;
}
interface IText {
  fontSize: string;
  marginBottom: string;
  priceSize: string;
  headlingSize: string;
}
export const Tariff = ({
  price,
  type,
  id,
  handleTariff,
  currentTariffId,
}: IProps) => {
  const [textParams, setTextParams] = useState<IState["textParams"]>({
    fontSize: "small",
    marginBottom: "10px",
    priceSize: "xx-small",
    headlingSize: "10px",
  });
  const tariffParams = [
    {
      type: "DAY",
      fuel: "не включено",
      mileage: "70км бесплатно",
      overMileage: "10 руб/км",
      standbyMode: "10 минут бесплатного ожидания",
      carWaiting: "",
    },
    {
      type: "MINUTE",
      carWaiting: "1,75 руб/мин",
      standbyMode: "10 минут бесплатного ожидания",
      fuel: "",
      mileage: "",
      overMileage: "",
    },
  ];
  const handleOnClick = () => {
    handleTariff(id);
  };
  useEffect(() => {
    document.documentElement.clientWidth < 992
      ? setTextParams((prevState) => ({
          ...prevState,
          fontSize: "x-small",
          marginBottom: "5px",
          priceSize: "small",
          headlingSize: "15px",
        }))
      : document.documentElement.clientWidth < 1200
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
          headlingSize: "25px",
        }));
  }, []);
  return (
    <div
      className={`tariff__container tariff__container${
        currentTariffId === id && "--active"
      }`}
      onClick={handleOnClick}
    >
      {" "}
      <h1 style={{ fontSize: textParams.headlingSize, marginBottom: "10px" }}>
        {type === "DAY" ? "Суточный" : "Поминутный"}
      </h1>
      <div className="tariff__container__price">
        <TariffContent
          textParams={textParams}
          tariffParams={tariffParams}
          price={price}
          tariff={type}
        />
      </div>
    </div>
  );
};
