import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import { TariffContent } from "./TariffContent";
import { ITariff } from "../../../../../interfaces/tariffs";
import { RootState } from "../../../../../store/store";

interface IProps {
  tariff: ITariff;
  currentTariffId: string;
  handleTariff: (tariff: ITariff) => void;
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
export const Tariff = ({ tariff, handleTariff, currentTariffId }: IProps) => {
  const [duration, setDuration] = useState(0);
  const startsAt = useSelector((state: RootState) => state.order.startsAt);
  const endsAt = useSelector((state: RootState) => state.order.endsAt);
  useEffect(() => {
    if (endsAt && startsAt) {
      setDuration(
        Math.trunc(
          (new Date(endsAt).getTime() - new Date(startsAt).getTime()) /
            (60000)
        )
      );
    } else {
      setDuration(0);
    }
  }, [endsAt]);
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
    handleTariff(tariff);
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
        currentTariffId === tariff.id && "--active"
      } tariff__container${
        duration >= 24 && tariff.type === "MINUTE" && "--unactive"
      }`}
      onClick={handleOnClick}
    >
      {" "}
      <h1 style={{ fontSize: textParams.headlingSize, marginBottom: "10px" }}>
        {tariff.type === "DAY" ? "Суточный" : "Поминутный"}
      </h1>
      <div className="tariff__container__price">
        <TariffContent
          textParams={textParams}
          tariffParams={tariffParams}
          price={tariff.price}
          tariff={tariff.type}
          duration={duration}
        />
      </div>
    </div>
  );
};
