/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      cognitoUserName: null,
      cognitoSub: null,
      email: null,
      idToken: null,
      accessToken: null,
      refreshToken: null,
      didAutoLogout: false,
      isAuthenticated: false,
      session: null,
    };
  },
  mutations,
  actions,
  getters,
};
