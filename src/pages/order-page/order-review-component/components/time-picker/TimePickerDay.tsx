import "./styles.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../../../../store/store";
import { ITariff } from "../../../../../interfaces/tariffs";
import { IVariant } from "../../../../../interfaces/variant";
import { RootState } from "../../../../../store/store";
import { TEvent } from "../../../../../interfaces/event";

interface IProps {
  currentTariff: ITariff;
  isDisabledEndInput: boolean;
  isDisabledStartInput: boolean;
  tariffs: ITariff[];
  variants: IVariant[];
  handleTimeDuration: (min: number) => void;
  startsAt: string;
  endsAt: string;
  handleChangeStartPicker: (e: TEvent) => void;
  handleChangeStartTime: (time: string) => void;
  handleChangeEndPicker: (e: TEvent) => void;
  handleChangeEndTime: (time: string) => void;
}

export const TimePickerDay = ({
  startsAt,
  isDisabledEndInput,
  isDisabledStartInput,
  endsAt,
  tariffs,
  variants,
  currentTariff,
  handleTimeDuration,
  handleChangeStartPicker,
  handleChangeStartTime,
  handleChangeEndPicker,
  handleChangeEndTime,
}: IProps) => {
  const anotherTariff = tariffs.find((tariff) => tariff.type === "DAY");

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    let year = new Date(startsAt).getFullYear();
    let month = new Date(startsAt).getMonth();
    let day = new Date(startsAt).getDate();
    let hour = new Date(startsAt).getHours();
    let min = new Date(startsAt).getMinutes();
    let endYear = new Date(endsAt).getFullYear();
    let endMonth = new Date(endsAt).getMonth();
    let endDay = new Date(endsAt).getDate();
    let endHour = new Date(endsAt).getHours();
    let endMin = new Date(endsAt).getMinutes();
    if (year > endYear) {
      handleChangeEndTime("");
    } else {
      if (month > endMonth) {
        handleChangeEndTime("");
      } else {
        if (day > endDay && month === endMonth) {
          handleChangeEndTime("");
        } else {
          if (day === endDay && hour > endHour) {
            handleChangeEndTime("");
          } else if (
            day === endDay &&
            hour === endHour &&
            (min > endMin || min === endMin)
          ) {
            handleChangeEndTime("");
          }
        }
      }
    }
  }, [startsAt, endsAt]);
  useEffect(() => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let newHours = new Date(startsAt).getHours();
    let newMinutes = new Date(startsAt).getMinutes();
    let currentYear = new Date(startsAt).getFullYear();
    let currentMonth = new Date(startsAt).getMonth();
    let currentDay = new Date(startsAt).getDate();
    if (startsAt) {
      if (
        year === currentYear &&
        month === currentMonth &&
        day === currentDay
      ) {
        if (hour > newHours) {
          handleChangeStartTime("");
        } else {
          if (hour === newHours && minutes > newMinutes) {
            handleChangeStartTime("");
          }
        }
      }
    }
  }, [startsAt]);

  useEffect(() => {
    let day2 = new Date(endsAt);
    let day1 = new Date(startsAt);
    let diff = Math.abs(day2.getTime() - day1.getTime());
    let hoursRange = Math.trunc(diff / (1000 * 3600));
    handleTimeDuration(diff);
    if (hoursRange >= 24 && currentTariff.type === "MINUTE") {
      dispatch.order.setTariffId(anotherTariff!.id);
    }

    console.log("количество минут", diff / 60000);
  }, [endsAt, startsAt, currentTariff]);
  return (
    <div className='timepicker__container'>
      <div className='timepicker'>
        {" "}
        <span>Начало бронирования</span>
        <input
          disabled={isDisabledStartInput}
          key={"start"}
          value={startsAt}
          onChange={handleChangeStartPicker}
          type='datetime-local'
          min={new Date().toJSON().slice(0, 16)}
        />
      </div>
      <div className='timepicker'>
        <span>Окончание бронирования</span>
        <input
          disabled={isDisabledEndInput}
          key={"end"}
          value={endsAt}
          onChange={handleChangeEndPicker}
          type='datetime-local'
          min={
            startsAt
              ? new Date(
                  Date.UTC(
                    new Date(startsAt).getFullYear(),
                    new Date(startsAt).getMonth(),
                    new Date(startsAt).getDate(),
                    new Date(startsAt).getHours(),
                    new Date(startsAt).getMinutes() + 1
                  )
                )
                  .toJSON()
                  .slice(0, 16)
              : new Date().toJSON().slice(0, 16)
          }
        />
      </div>
    </div>
  );
};
