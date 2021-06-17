/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/

//timeout in seconds
// let seconds_timeout = 3600;

import { CognitoUserPool } from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "../../config/cognito";

export default {
  setIDToken(context, payload) {
    context.commit("setIDToken", payload);
  },
  setAccessToken(context, payload) {
    context.commit("setAccessToken", payload);
  },
  setUsername(context, payload) {
    context.commit("setUsername", payload);
  },
  setIsAuthenticated(context, payload) {
    context.commit("setIsAuthenticated", payload);
  },
  setEmail(context, payload) {
    context.commit("setEmail", payload);
  },
  setSession(context, payload) {
    context.commit("setSession", payload);
  },
  logout(context) {
    console.log("log out called");

    // gets reference to the Cognito user pool
    const userPool = new CognitoUserPool(POOL_DATA);

    //gets current logged in user
    const cognitoUser = userPool.getCurrentUser();

    localStorage.clear();

    cognitoUser.signOut();

    context.commit("logout");
  },
  tryLogin(payload) {
    console.log(payload);
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
