import "./styles.scss";
import { useEffect, useState } from "react";
import { TEvent } from "../../../../../interfaces/event";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../../../store/store";

interface IState {
  startsAt: string;
  endsAt: string;
}

export const TimePickerDay = () => {
  const [startsAt, setStartsAt] = useState<IState["startsAt"]>("");
  const [endsAt, setEndsAt] = useState<IState["endsAt"]>("");

  const startsAtCurrent = useSelector(
    (state: RootState) => state.order.startsAt,
  );
  const endssAtCurrent = useSelector((state: RootState) => state.order.endsAt);

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (startsAtCurrent && endssAtCurrent) {
      let dayStart = new Date(startsAtCurrent).toJSON().slice(0, 16);
      let dayEnd = new Date(endssAtCurrent).toJSON().slice(0, 16);
      setStartsAt(dayStart);
      setEndsAt(dayEnd);
    } else return;
  }, []);

  const handleChangeStartPicker = (e: TEvent) => {
    setStartsAt((prevState) => e.target.value);
    dispatch.order.setStartsAt(e.target.value);
  };

  const handleResetStartPicker = () => {
    setStartsAt((prevState) => "");
    dispatch.order.setStartsAt("");
  };

  const handleChangeEndPicker = (e: TEvent) => {
    setEndsAt((prevState) => e.target.value);
    dispatch.order.setEndsAt(e.target.value);
  };

  const handleResetEndPicker = () => {
    setEndsAt((prevState) => "");
    dispatch.order.setEndsAt("");
  };

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
  useEffect(() => {
    console.log("rerender timepicker");
  });
  return (
    <div className="timepicker-container">
      <div className="timepicker-container__content">
        <span>Начало бронирования</span>
        <input
          key={"start"}
          value={startsAt}
          onChange={(e) => handleChangeStartPicker(e)}
          type="datetime-local"
          min={new Date().toJSON().slice(0, 16)}
        />
      </div>
      <div className="timepicker-container__content">
        <span>Окончание бронирования</span>
        <input
          key={"end"}
          value={endsAt}
          onChange={(e) => handleChangeEndPicker(e)}
          type="datetime-local"
          min={
            startsAt
              ? new Date(
                  Date.UTC(
                    new Date(startsAt).getFullYear(),
                    new Date(startsAt).getMonth(),
                    new Date(startsAt).getDate(),
                    new Date(startsAt).getHours(),
                    new Date(startsAt).getMinutes() + 1,
                  ),
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
