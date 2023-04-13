import "./styles.scss";
import { TimePickerDay } from "../time-picker/TimePickerDay";
import { TariffVariants } from "../tariff-variants/TariffVariants";
import { ITariff } from "../../../../../interfaces/tariffs";
import { IVariant } from "../../../../../interfaces/variant";
import { useState, useEffect } from "react";
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
  const [startsAt, setStartsAt] = useState(new Date().toJSON().slice(0, 16));
  const [endsAt, setEndsAt] = useState("");
  const currentVariantTariff = variants.find(
    (item) => item.id === currentVariant
  );

  useEffect(() => {
    console.log("ДЕНЬ", currentVariantTariff);
    if (currentVariantTariff?.variant === "ONE_DAY") {
      handleChangeEndTime(
        new Date(
          Date.UTC(
            new Date(startsAt).getFullYear(),
            new Date(startsAt).getMonth(),
            new Date(startsAt).getDate() + 1,
            new Date(startsAt).getHours(),
            new Date(startsAt).getMinutes()
          )
        )
          .toJSON()
          .slice(0, 16)
      );
    }
  }, [currentVariant]);
  const [duration, setDuration] = useState(0);
  const handleTimeDuration = (min: number) => {
    setDuration(min);
  };
  const handleChangeStartPicker = (e: any) => {
    setStartsAt(e.target.value);
  };
  const handleChangeStartTime = (time: string) => {
    setStartsAt(time);
  };
  const handleChangeEndPicker = (e: any) => {
    setEndsAt(e.target.value);
  };
  const handleChangeEndTime = (time: string) => {
    setEndsAt(time);
  };
  return (
    <div>
      <>
        <TimePickerDay
          startsAt={startsAt}
          endsAt={endsAt}
          handleChangeStartPicker={handleChangeStartPicker}
          handleChangeStartTime={handleChangeStartTime}
          handleChangeEndPicker={handleChangeEndPicker}
          handleChangeEndTime={handleChangeEndTime}
          variants={variants}
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
        {startsAt && (
          <>
            <span>или выберите минимальный пакет бронирования</span>
            <TariffVariants
              currentVariant={currentVariant}
              handleVariant={handleVariant}
              currentTariff={currentTariff}
              variants={variants}
            />
          </>
        )}
      </div>
    </div>
  );
};
