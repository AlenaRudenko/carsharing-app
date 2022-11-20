import { user } from "./models/user.model";
import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";

export interface RootModel extends Models<RootModel> {
  user: typeof user;
}

const models: RootModel = { user };

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
