import { useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Api } from "../../../services/api.service";
import { ICar } from "../../../interfaces/car";
import { ICarVariant } from "../../../interfaces/car-variant";
import "./styles.scss";
import { ITariff } from "../../../interfaces/tariffs";
import { Tariff } from "./components/tariff/Tariff";
import { TEvent } from "../../../interfaces/event";
import { Service } from "./components/service/Service";
import { TimePickerDay } from "./components/time-picker/TimePickerDay";
import { CarColors } from "./components/car-colors/CarColors";

export const OrderParams = () => {
  return (
    <div className="orderParams-container">
      <TimePickerDay />
      <CarColors />
      <Tariff />
      <Service />
    </div>
  );
};
