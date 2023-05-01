import "./styles.scss";
import { ToggleSwitch } from "../../../../../components/toggle-switch/ToggleSwitch";
import { TimePickerDay } from "../time-picker/TimePickerDay";
import { TariffVariants } from "../tariff-variants/TariffVariants";
import { ITariff } from "../../../../../interfaces/tariffs";
import { IVariant } from "../../../../../interfaces/variant";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../../../store/store";
import { HelpModal } from "../../../../../components/help-modal/HelpModal";
import { useLocation } from "react-router";
interface IProps {
  tariffs: ITariff[];
  variants: IVariant[];
  currentTariff: ITariff;
  currentVariant: IVariant["id"];
}

export const OrderTime = ({
  tariffs,
  variants,
  currentTariff,
  currentVariant,
}: IProps) => {
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [isDisabledEndInput, setIsDisabledEndInput] = useState(false);
  const [isDisabledStartInput, setIsDisabledStartInput] = useState(false);
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();

  const currentVariantTariff = variants.find(
    (item) => item.id === currentVariant
  );
  useEffect(() => {
    if (location.pathname === "/order/order-full") {
      setIsDisabledEndInput(true);
      setIsDisabledStartInput(true);
    } else {
      setIsDisabledEndInput(false);
      setIsDisabledStartInput(false);
    }
  }, [location]);
  useEffect(() => {
    setEndsAt("");
  }, [currentTariff]);
  useEffect(() => {
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
    } else {
      if (currentVariantTariff?.variant === "ONE_HOUR") {
        handleChangeEndTime(
          new Date(
            Date.UTC(
              new Date(startsAt).getFullYear(),
              new Date(startsAt).getMonth(),
              new Date(startsAt).getDate(),
              new Date(startsAt).getHours() + 1,
              new Date(startsAt).getMinutes()
            )
          )
            .toJSON()
            .slice(0, 16)
        );
      } else {
        if (currentVariantTariff?.variant === "THREE_HOURS") {
          handleChangeEndTime(
            new Date(
              Date.UTC(
                new Date(startsAt).getFullYear(),
                new Date(startsAt).getMonth(),
                new Date(startsAt).getDate(),
                new Date(startsAt).getHours() + 3,
                new Date(startsAt).getMinutes()
              )
            )
              .toJSON()
              .slice(0, 16)
          );
        }
      }
    }
  }, [currentVariant, startsAt]);

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
    if (id !== currentVariantTariff?.id) {
      dispatch.order.setVariantId(id);
      setIsDisabledEndInput(true);
    } else {
      dispatch.order.removeEndsAt();
      dispatch.order.removeVariantId();
      setIsDisabledEndInput(false);
      setEndsAt("");
      setDuration(0);
    }
  };
  function daysNaming(duration: number) {
    const cases = [2, 0, 1, 1, 1, 2];
    const dayText = ["день", "дня", "дней"];
    const minText = ["минута", "минуты", "минут"];
    if (currentTariff.type === "DAY") {
      const time = Math.ceil(duration / (1000 * 3600 * 24));
      return (
        Math.ceil(duration / (1000 * 3600 * 24)) +
        " " +
        dayText[
          time % 100 > 4 && time % 100 < 20
            ? 2
            : cases[time % 10 < 5 ? time % 10 : 5]
        ]
      );
    } else {
      const time = duration / 60000;
      return (
        duration / 60000 +
        " " +
        minText[
          time % 100 > 4 && time % 100 < 20
            ? 2
            : cases[time % 10 < 5 ? time % 10 : 5]
        ]
      );
    }
  }
  return (
    <>
      <div className='orderReview__time'>
        <TimePickerDay
          isDisabledStartInput={isDisabledStartInput}
          isDisabledEndInput={isDisabledEndInput}
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
      </div>
      <div className='orderReview__duration'>
        {startsAt && endsAt && currentTariff.type === "MINUTE" && (
          <span>{`${daysNaming(duration)}`}</span>
        )}
        {startsAt && endsAt && currentTariff.type === "DAY" && (
          <div className='orderReview__helpContainer'>
            <div className='orderReview__help'>
              <span>{`${daysNaming(duration)}`}</span>{" "}
              <HelpModal
                fontSize='13px'
                descrintion={
                  'В тарифе "Суточный" одна минута считается за полные сутки, тем самым вы бронируете авто на все сутки'
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className='orderReview__variants'>
        {startsAt && location.pathname !== "/order/order-full" && (
          <>
            <span style={{ marginBottom: "10px", fontSize: "13px" }}>
              или выберите минимальный пакет бронирования
            </span>
            <TariffVariants
              currentVariant={currentVariant}
              handleVariant={handleTogleSwitch}
              currentTariff={currentTariff}
              variants={variants}
            />
          </>
        )}
      </div>
    </>
  );
};
