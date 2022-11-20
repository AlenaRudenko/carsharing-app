import { ICarVariant } from "./car-variant";

export interface ICar {
  id: string;
  brand: string;
  model: string;
  stateNumber: string;
  variants: ICarVariant[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}
