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
    addressId: "",
    childChair: false,
    lifeEnsurance: false,
    carEnsurance: false,
  },
  reducers: {
    setCarVariantId: (state, payload: ICarVariant["id"]) => {
      return {
        ...state,
        carVariantId: payload,
      };
    },
    setCarId: (state, payload: ICar["id"]) => {
      return {
        ...state,
        carId: payload,
        carVariantId: "",
      };
    },
    setCityId: (state, payload: IOrder["cityId"]) => {
      return {
        ...state,
        cityId: payload,
      };
    },
    setAddressId: (state, payload: IOrder["addressId"]) => {
      return {
        ...state,
        addressId: payload,
      };
    },
    setVariantId: (state, payload: IOrder["variantId"]) => {
      return {
        ...state,
        variantId: payload,
      };
    },
    setTariffId: (state, payload: IOrder["tariffId"]) => {
      return {
        ...state,
        tariffId: payload,
        variantId: "",
      };
    },
    toggleChildChair: (state) => {
      return {
        ...state,
        childChair: !state.childChair,
      };
    },
    toggleCarEnsurance: (state) => {
      return {
        ...state,
        carEnsurance: !state.carEnsurance,
      };
    },
    toggleLifeEnsurance: (state) => {
      return {
        ...state,
        lifeEnsurance: !state.lifeEnsurance,
      };
    },
  },
});
