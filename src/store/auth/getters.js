/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
export default {
  cognitoUserName(state) {
    return state.cognitoUserName;
  },
  cognitoSub(state) {
    return state.cognitoSub;
  },
  idToken(state) {
    return state.idToken;
  },
  session(state) {
    return state.session;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  accessToken(state) {
    return state.accessToken;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  email(state) {
    return state.email;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
