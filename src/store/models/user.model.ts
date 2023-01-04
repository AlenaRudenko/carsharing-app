import { IUser } from "./../../interfaces/user";
import { createModel } from "@rematch/core";
import { RootModel } from "../store";

export const user = createModel<RootModel>()({
  state: null as IUser | null,
  reducers: {
    setUser(state, payload: IUser) {
      return payload;
    },
    removeUser(state) {
      return null;
    },
  },
});
