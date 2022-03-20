import { action, createStore } from "easy-peasy";

export const store = createStore({
  // state
  session: null,
  // actions
  setSession: action((state, data) => {
    state.session = data;
  }),
});
