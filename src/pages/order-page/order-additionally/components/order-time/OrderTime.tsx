import "./styles.scss";
import { TimePickerDay } from "./time-picker/TimePickerDay";
import { ITariff } from "../../../../../interfaces/tariffs";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../../../store/store";
import { HelpModal } from "../../../../../components/help-modal/HelpModal";
import { useLocation } from "react-router";
interface IProps {
  handleDuration: (time: number) => void;
}

export const OrderTime = ({ handleDuration }: IProps) => {
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const [isDisabledEndInput, setIsDisabledEndInput] = useState(false);
  const [isDisabledStartInput, setIsDisabledStartInput] = useState(false);

  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();

  const handleChangeStartPicker = (e: any) => {
    setStartsAt(e.target.value);
    dispatch.order.setStartsAt(e.target.value);
  };
  const handleChangeStartTime = (time: string) => {
    setStartsAt(time);
    dispatch.order.setStartsAt(time);
  };
  const handleChangeEndPicker = (e: any) => {
    setEndsAt(e.target.value);
    dispatch.order.setEndsAt(e.target.value);
  };
  const handleChangeEndTime = (time: string) => {
    setEndsAt(time);
    dispatch.order.setEndsAt(time);
  };

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
          handleTimeDuration={handleDuration}
        />
      </div>
    </>
  );
};
