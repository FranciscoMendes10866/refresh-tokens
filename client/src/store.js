import { action, createStore, computed } from "easy-peasy";

export const store = createStore({
  // state
  session: null,
  // actions
  setSession: action((state, data) => {
    state.session = data;
  }),
  // computed
  isLoggedIn: computed((state) => state.session !== null),
  currentSession: computed((state) => state.session),
});
