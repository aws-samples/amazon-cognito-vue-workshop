/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
export default {
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setIDToken(state, payload) {
    state.idToken = payload;
  },
  setAccessToken(state, payload) {
    state.accessToken = payload;
  },
  setUsername(state, payload) {
    state.cognitoUserName = payload;
  },
  logout(state) {
    state.isAuthenticated = false;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setEmail(state, payload) {
    state.email = payload;
  },
  setSession(state, payload) {
    state.session = payload;
  },
};
