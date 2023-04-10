import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../../../store/store";
import { ITariff } from "../../../../../interfaces/tariffs";

interface IProps {
  currentTariff: ITariff;
  tariffs: ITariff[];
  handleTimeDuration: (min: number) => void;
}

export const TimePickerDay = ({
  tariffs,
  currentTariff,
  handleTimeDuration,
}: IProps) => {
  const [startsAt, setStartsAt] = useState(new Date().toJSON().slice(0, 16));
  const [endsAt, setEndsAt] = useState("");

  const anotherTariff = tariffs.find(
    (tariff) => tariff.id !== currentTariff?.id
  );
  const dispatch = useDispatch<Dispatch>();

  const handleChangeStart = (e: any) => {
    setStartsAt(e.target.value);
  };
  const handleChangeEnd = (e: any) => {
    setEndsAt(e.target.value);
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
      setEndsAt("");
    } else {
      if (month > endMonth) {
        setEndsAt("");
      } else {
        if (day > endDay) {
          setEndsAt("");
        } else {
          if (day === endDay && hour > endHour) {
            setEndsAt("");
          } else if (day === endDay && hour === endHour && min > endMin) {
            setEndsAt("");
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
    let newHours = startsAt
      .slice(-5)
      .split(":")
      .map((i) => +i)[0];
    let newMinutes = startsAt
      .slice(-5)
      .split(":")
      .map((i) => +i)[1];
    let currentYear = new Date(startsAt).getFullYear();
    let currentMonth = new Date(startsAt).getMonth();
    let currentDay = new Date(startsAt).getDate();
    if (year === currentYear && month === currentMonth && day === currentDay) {
      if (hour > newHours) {
        setStartsAt("");
      } else {
        if (hour === newHours && minutes > newMinutes) {
          setStartsAt("");
        }
      }
    }
  }, [startsAt]);
  useEffect(() => {}, [startsAt, endsAt]);
  useEffect(() => {
    let day2 = new Date(endsAt);
    let day1 = new Date(startsAt);
    let diff = Math.abs(day2.getTime() - day1.getTime());
    let hoursRange = Math.trunc(diff / (1000 * 3600));
    let daysRange = Math.ceil(diff / (1000 * 3600 * 24));
    handleTimeDuration(diff / 60000);
    if (hoursRange >= 24 && currentTariff.type === "MINUTE") {
      dispatch.order.setTariffId(anotherTariff?.id);
    }

    console.log("количество минут", diff / 60000);
  }, [endsAt, startsAt, currentTariff]);
  return (
    <div>
      <input
        key={"start"}
        value={startsAt}
        onChange={handleChangeStart}
        type="datetime-local"
        min={new Date().toJSON().slice(0, 16)}
      />
      <input
        key={"end"}
        value={endsAt}
        onChange={handleChangeEnd}
        type="datetime-local"
        min={
          startsAt
            ? new Date(startsAt).toJSON().slice(0, 16)
            : new Date().toJSON().slice(0, 16)
        }
      />
    </div>
  );
};
