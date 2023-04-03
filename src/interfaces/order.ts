import { ICar } from "./car";
import { ICarVariant } from "./car-variant";
import { ITariff } from "./tariffs";

export interface IOrder {
  startsAt: string;
  endsAt: string;
  carId: string;
  carVariantId: string;
  cityId: string;
  variantId: string;
  tariffId: string;
  addressId: string;
  childChair: boolean;
  carEnsurance: boolean;
  LifeEnsurance: boolean;
}
