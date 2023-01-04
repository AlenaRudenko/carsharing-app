import { user } from "./models/user.model";
import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import { createLogger } from "redux-logger";

export interface RootModel extends Models<RootModel> {
  user: typeof user;
}

const models: RootModel = { user };
const logger = createLogger();
export const store = init({
  models,
  redux: {
    middlewares: [logger],
  },
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
