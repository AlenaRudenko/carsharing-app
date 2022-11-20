import { createModel } from "@rematch/core";

export const user = createModel()({
  state: null,
  reducers: {
    setUser(state, payload) {
      return state;
    },
  },
});
