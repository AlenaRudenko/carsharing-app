import { ITariff } from "../../../../../interfaces/tariffs";
import { IVariant } from "../../../../../interfaces/variant";
import "./styles.scss";
import { OrderField } from "../OrderField";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { useEffect, useState } from "react";

interface IProps {
  duration: number;
  currentTariff: ITariff;
  selectedVariant?: IVariant;
}

export const TariffOptions = ({
  currentTariff,
  selectedVariant,
  duration,
}: IProps) => {
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
