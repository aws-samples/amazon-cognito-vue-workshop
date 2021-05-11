import { createStore } from "vuex";
import authModule from "./auth/index";
import settingsModule from "./settings/index";
import contactsModule from "./contacts/index";

export default createStore({
  state() {
    return {
      isLoading: false
    };
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    setIsLoading(context, payload) {
      context.commit("setIsLoading", payload);
    }
  },
  modules: {
    authModule,
    settingsModule,
    contactsModule
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    }
  }
});
