import { ICar } from "./car";
import { ICarVariant } from "./car-variant";
import { ITariff } from "./tariffs";

export interface IOrder {
  // ДОБАВИТЬ ГОРОД
  cityId: string;
  addressId: string;
  id: string;
  status: string;
  /** @format date-time */
  startsAt: string;
  /** @format date-time */
  endsAt: string;
  tariff: ITariff;
  variant: ICarVariant;
  car: ICar;
  carVariant: ICarVariant;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}
