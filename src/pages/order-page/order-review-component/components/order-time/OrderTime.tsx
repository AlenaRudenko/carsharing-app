import "./styles.scss";
import { ToggleSwitch } from "../../../../../components/toggle-switch/ToggleSwitch";
import { TimePickerDay } from "../time-picker/TimePickerDay";
import { TariffVariants } from "../tariff-variants/TariffVariants";
import { ITariff } from "../../../../../interfaces/tariffs";
import { IVariant } from "../../../../../interfaces/variant";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../../../store/store";
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
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const dispatch = useDispatch<Dispatch>();
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
    dispatch.order.setStartsAt(e.target.value);
  };
  const handleChangeStartTime = (time: string) => {
    setStartsAt(time);
    dispatch.order.setStartsAt("ded");
  };
  const handleChangeEndPicker = (e: any) => {
    setEndsAt(e.target.value);
    dispatch.order.setEndsAt(e.target.value);
  };
  const handleChangeEndTime = (time: string) => {
    setEndsAt(time);
    dispatch.order.setEndsAt(time);
  };
  const handleTogleSwitch = (id: string) => {
    if (!isChecked) {
      dispatch.order.setVariantId(id);
      setIsChecked(!isChecked);
      setIsDisabledInput(true);
    } else {
      dispatch.order.removeVariantId();
      setIsChecked(!isChecked);
      setIsDisabledInput(false);
      setEndsAt("");
    }
  };
  return (
    <div>
      <>
        <TimePickerDay
          isDisabledInput={isDisabledInput}
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
              handleTogleSwitch={handleTogleSwitch}
              isChecked={isChecked}
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
