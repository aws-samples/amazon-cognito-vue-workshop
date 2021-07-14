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
          <i class="bi bi-person-fill me-2"></i>Sign Up
        </template>
        <template v-slot:body>
          <form @submit.prevent="signUp">
            <div class="row">
              <div class="col-12 mb-3 text-start">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  v-model.trim="username"
                  class="form-control form-control-sm"
                  id="username"
                  autocomplete="false"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 mb-3 text-start">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  v-model.trim="email"
                  class="form-control form-control-sm"
                  id="email"
                  autocomplete="false"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 mb-3 text-start">
                <label for="current-password" class="form-label"
                  >Password</label
                >
                <input
                  type="password"
                  v-model.trim="password"
                  class="form-control form-control-sm"
                  id="current-password"
                  autocomplete="false"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 mb-3 text-start">
                <label for="current-password" class="form-label"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  v-model.trim="confirm_password"
                  class="form-control form-control-sm"
                  id="confirm-password"
                  autocomplete="false"
                />
              </div>
            </div>

            <div class="d-grid gap-2 col-12 mx-auto">
              <button class="btn btn-primary">
                <i class="bi bi-person-plus me-2"></i> Sign Up
              </button>
            </div>
            <div class="d-grid gap-2 col-12 mx-auto mt-2">
              <router-link to="/signin"
                ><span class="figcaption">Sign In</span></router-link
              >
            </div>
          </form>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { validateSignUpForm } from "../../utils/validator";
import useAlert from "../../hooks/alert";

import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

//imports userpool data from config
import { POOL_DATA } from "../../config/cognito";

export default {
  setup() {
    // create a reference to Vuex store
    // const store = useStore();

    //get access to Vuex router
    const router = useRouter();

    // reference to data input fields
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const username = ref("");

    const isShowing = ref(false);

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    // calls sign up method
    async function signUp() {
      if (!isValid()) {
        return;
      }

      //Signup code starts here
      //paste code here
      //Signup code ends here
    }

    function isValid() {
      const validationData = validateSignUpForm({
        username: username.value,
        password: password.value,
        confirm_password: confirm_password.value,
        email: email.value,
      });

      if (!validationData.valid) {
        setMessage(validationData.message, "alert-danger");
        return false;
      }

      return true;
    }

    return {
      email,
      username,
      password,
      signUp,
      confirm_password,
      isShowing,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
