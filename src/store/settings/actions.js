/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import { CognitoUserPool } from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "../../config/cognito";

export default {
  setMFA({ commit }, payload) {
    commit("setMFA", payload);
  },
  fetchMFAValue({ commit, rootState }) {
    // gets reference to the Cognito user pool
    const userPool = new CognitoUserPool(POOL_DATA);

    //gets current logged in user
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.setSignInUserSession(rootState.authModule.session);

    cognitoUser.getUserData(function(err, userData) {
      if (err) {
        console.log(err.message || JSON.stringify(err));
        return;
      }

      if (userData.UserMFASettingList.length > 0) {
        commit("setMFA", true);
      }
    });
  },
};
