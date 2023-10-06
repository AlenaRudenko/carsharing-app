import "./styles.scss";
import { useEffect } from "react";
import { TEvent } from "../../../../../interfaces/event";

interface IProps {
  handleTimeDuration: (min: number) => void;
  handleChangeStartPicker: (time: TEvent) => void;
  handleChangeEndPicker: (time: TEvent) => void;
  handleResetStartPicker: () => void;
  handleResetEndPicker: () => void;
  startsAt: string;
  endsAt: string;
}

export const TimePickerDay = ({
  handleTimeDuration,
  handleChangeStartPicker,
  handleChangeEndPicker,
  handleResetStartPicker,
  handleResetEndPicker,
  startsAt,
  endsAt,
}: IProps) => {
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
      handleResetEndPicker();
    } else {
      if (month > endMonth) {
        handleResetEndPicker();
      } else {
        if (day > endDay && month === endMonth) {
          handleResetEndPicker();
        } else {
          if (day === endDay && hour > endHour) {
            handleResetEndPicker();
          } else if (
            day === endDay &&
            hour === endHour &&
            (min > endMin || min === endMin)
          ) {
            handleResetEndPicker();
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
          handleResetStartPicker();
        } else {
          if (hour === newHours && minutes > newMinutes) {
            handleResetStartPicker();
          }
        }
      }
    }
  }, [startsAt]);
  //отправка продолжительности в мс
  useEffect(() => {
    let day2 = new Date(endsAt);
    let day1 = new Date(startsAt);
    let diff = day2.getTime() - day1.getTime();
    handleTimeDuration(diff);
  }, [endsAt, startsAt]);
  return (
    <div className='timepicker__container'>
      <div className='timepicker'>
        {" "}
        <span>Начало бронирования</span>
        <input
          key={"start"}
          value={startsAt}
          onChange={(e) => handleChangeStartPicker(e)}
          type='datetime-local'
          min={new Date().toJSON().slice(0, 16)}
        />
      </div>
      <div className='timepicker'>
        <span>Окончание бронирования</span>
        <input
          key={"end"}
          value={endsAt}
          onChange={(e) => handleChangeEndPicker(e)}
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
