import { TimePickerDay } from "../time-picker/TimePickerDay";
import { TariffVariants } from "../tariff-variants/TariffVariants";
import { ITariff } from "../../../../../interfaces/tariffs";
import { IVariant } from "../../../../../interfaces/variant";
import { useState } from "react";
interface IProps {
  tariffs: ITariff[];
  variants: IVariant[];
  currentTariff: ITariff;
  currentVariant: IVariant["id"];
  handleVariant: (id: IVariant) => void;
}

export const OrderTime = ({
  tariffs,
  variants,
  currentTariff,
  currentVariant,
  handleVariant,
}: IProps) => {
  const [duration, setDuration] = useState(0);
  const handleTimeDuration = (min: number) => {
    setDuration(min);
  };
  return (
    <div>
      <>
        <TimePickerDay
          tariffs={tariffs}
          currentTariff={currentTariff}
          handleTimeDuration={handleTimeDuration}
        />
        {currentTariff.type === "MINUTE" && (
          <span>{`${duration / 60000} минут`}</span>
        )}
        {currentTariff.type === "DAY" && (
          <span>{`${Math.ceil(duration / (1000 * 3600 * 24))} дней`}</span>
        )}
      </>
      <div className="orderReview__variants">
        <span>или выберите минимальный пакет бронирования</span>
        {currentTariff?.type === "DAY" &&
          variants!
            .filter((variant) => variant.variant === "ONE_DAY")
            .map((item) => (
              <TariffVariants
                key={item.id}
                currentVariant={currentVariant}
                handleVariant={handleVariant}
                currentTariff={currentTariff}
                variants={variants}
              />
            ))}
        {currentTariff &&
          currentTariff?.type === "MINUTE" &&
          variants!
            .filter((variant) => variant.variant !== "ONE_DAY")
            .map((item) => (
              <TariffVariants
                variants={variants}
                currentTariff={currentTariff}
                key={item.id}
                currentVariant={currentVariant}
                handleVariant={handleVariant}
              />
            ))}
      </div>
    </div>
  );
};
