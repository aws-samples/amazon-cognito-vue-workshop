<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <div class="container">
    <div class="col-3 offset-md-5">
      <base-message :type="messageStyleType" v-if="message">{{
        message
      }}</base-message>
      <base-card>
        <template v-slot:title>
          <i class="bi bi-person-fill me-2"></i>Sign In
        </template>
        <template v-slot:body>
          <form @submit.prevent="signIn">
            <span v-if="!confirmMFACode">
              <div class="row">
                <div class="col-12">
                  <div class="mb-3 text-start">
                    <label for="state" class="form-label">Username</label>
                    <input
                      type="text"
                      id="current-password"
                      v-model.trim="username"
                      autocomplete="false"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3 text-start">
                    <label for="state" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control form-control-sm"
                      id="current-password"
                      v-model.trim="password"
                      autocomplete="false"
                    />
                  </div>
                </div>
              </div>
            </span>
            <div class="row" v-if="confirmMFACode">
              <div class="col-12">
                <div class="mb-3 text-start">
                  <label for="state" class="form-label">MFA Code</label>
                  <input
                    type="password"
                    class="form-control form-control-sm"
                    id="current-password"
                    v-model.trim="mfaCode"
                    autocomplete="false"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="mb-3 text-start d-grid gap-2 col-12 mx-auto mt-2">
                  <button class="btn btn-small btn-primary">
                    <i class="bi bi-box-arrow-in-right me-1"></i>
                    {{ confirmMFACode ? "Confirm MFA Code" : "Sign In" }}
                  </button>
                </div>
              </div>
            </div>
            <div class="text-center">
              <router-link to="/forgotpassword"
                ><span class="figcaption">Forgot Password</span></router-link
              >
              |
              <router-link to="/signup"
                ><span class="figcaption">Sign Up</span></router-link
              >
            </div>
          </form>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { validateSignInForm } from "../../utils/validator";
import useAlert from "../../hooks/alert";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "../../config/cognito";

export default {
  setup() {
    // create a reference to Vuex store
    const store = useStore();
    // creates a reference to Vue router
    const router = useRouter();
    const route = useRoute();

    // stores reactive ref to email and password inputs
    const username = ref("");
    const password = ref("");
    const mfaCode = ref("");

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();
    const confirmMFACode = ref(false);

    // sign in method that calls the Cognito JavaScript SDK
    function signIn() {
      // runs form validation code
      if (!isValid()) {
        return;
      }
      //Sign-in code starts here
      //paste code here
      // Sign-in code ends here
    }

    // calculates when user will be auto logged out
    function autoTimeout(result) {
      const seconds_timeout = 3600;

      // sets user login to expire after 1 hour
      const expirationDate =
        +result.idToken.payload["auth_time"] + seconds_timeout;
      console.log(
        "Auth Time " + +result.idToken.payload["auth_time"],
        " Expire Date " + expirationDate
      );
      var expires_millseconds =
        (expirationDate - +result.idToken.payload["auth_time"]) * 1000;
      console.log("Expires in milliseconds ", expires_millseconds);

      return expires_millseconds;
    }

    function setUserSessionInfo(session) {
      // starts timer to auto logout after 1 hour
      setTimeout(function() {
        store.dispatch("autoLogout");
        console.log("auto logging out");
        router.replace("/signin");
        alert("You have been automatically logged out");
      }, autoTimeout(session));

      store.dispatch("setSession", session);
      store.dispatch("setIDToken", session.getIdToken().getJwtToken());
      store.dispatch(
        "setUsername",
        session.idToken.payload["cognito:username"]
      );
      store.dispatch("setIsAuthenticated", true);
      store.dispatch("setEmail", session.idToken.payload.email);
    }

    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
    });

    function isValid() {
      const validationData = validateSignInForm({
        username: username.value,
        password: password.value,
      });

      if (!validationData.valid) {
        setMessage(validationData.message, "alert-danger");
        return false;
      }

      return true;
    }

    return {
      username,
      password,
      signIn,
      message,
      messageStyleType,
      mfaCode,
      autoTimeout,
      confirmMFACode,
      setUserSessionInfo,
    };
  },
};
</script>

<style></style>
