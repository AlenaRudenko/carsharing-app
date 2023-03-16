import { IOrder } from "./../../interfaces/order";
import { ITariff } from "./../../interfaces/tariffs";
import { ICarVariant } from "./../../interfaces/car-variant";
import { RootModel } from "./../store";
import { createModel } from "@rematch/core";
import { ICar } from "../../interfaces/car";

export const order = createModel<RootModel>()({
  state: {
    startsAt: "",
    endsAt: "",
    carId: "",
    carVariantId: "",
    cityId: "",
    variantId: "",
    tariffId: "",
  },
  reducers: {
    setCarVariantId: (state, payload: ICarVariant["id"]) => {
      return {
        ...state,
        carVariantId: payload,
      };
    },
    setTariffId(state, payload: ITariff["id"]) {
      return {
        ...state,
        tariffId: payload,
      };
    },
    setCarId(state, payload: ICar["id"]) {
      return {
        ...state,
        carId: payload,
      };
    },
    setCityId(state, payload: IOrder["cityId"]) {
      return {
        ...state,
        cityId: payload,
      };
    },
  },
});
