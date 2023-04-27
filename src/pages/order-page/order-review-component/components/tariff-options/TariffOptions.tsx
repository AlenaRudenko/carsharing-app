import { ITariff } from "../../../../../interfaces/tariffs";
import { IVariant } from "../../../../../interfaces/variant";
import "./styles.scss";
import { OrderField } from "../OrderField";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { useEffect, useState } from "react";

interface IProps {
  currentTariff: ITariff;
  selectedVariant?: IVariant;
}

export const TariffOptions = ({ currentTariff, selectedVariant }: IProps) => {
  const [duration, setDuration] = useState(0);
  const startsAt = useSelector((state: RootState) => state.order.startsAt);
  const endsAt = useSelector((state: RootState) => state.order.endsAt);
  useEffect(() => {
    if (startsAt && endsAt) {
      if (currentTariff.type === "DAY") {
        setDuration(
          Math.ceil(
            (new Date(endsAt).getTime() - new Date(startsAt).getTime()) /
              (1000 * 3600 * 24)
          )
        );
      } else {
        if (currentTariff.type === "MINUTE") {
          setDuration(
            Math.trunc(
              (new Date(endsAt).getTime() - new Date(startsAt).getTime()) /
                60000
            )
          );
        }
      }
    } else setDuration(0);
  }, [startsAt, endsAt, selectedVariant]);
  return (
    <div className="tariffs__container">
      {duration}
      {currentTariff.type === "DAY" && (
        <OrderField
          description="Суточный тариф"
          value={`${currentTariff.price} руб/сутки`}
          amount={`${duration * currentTariff.price} руб`}
        />
      )}
      {currentTariff.type === "MINUTE" && (
        <OrderField
          description="Поминутный тариф"
          value={`${currentTariff.price} руб/мин`}
          amount={`от ${duration * currentTariff.price} руб`}
        />
      )}
    </div>
  );
};
