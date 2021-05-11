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
      <base-card v-if="!confirmCode">
        <template v-slot:title>
          <i class="bi bi-question-circle me-3"></i>Forgot Password
        </template>
        <template v-slot:body>
          <form @submit.prevent="sendCode" v-show="!confirmCode">
            <div class="row">
              <div class="col-12">
                <div class="mb-3 text-start">
                  <label for="state" class="form-label">Username</label>
                  <input
                    type="text"
                    v-model.trim="username"
                    class="form-control form-control-sm"
                    id="username"
                    autocomplete="false"
                  />
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 col-12 mx-auto">
              <button class="btn btn-primary">
                <i class="bi bi-envelope me-2"></i>Send Password Reset Code
              </button>
            </div>

            <div class="text-center mt-2">
              <router-link to="/signin"
                ><span class="figcaption">Sign In</span></router-link
              >
              |
              <router-link to="/signup"
                ><span class="figcaption">Sign Up</span></router-link
              >
            </div>
          </form>
        </template>
      </base-card>

      <base-card v-if="confirmCode">
        <template v-slot:title>
          Change Password
        </template>
        <template v-slot:body>
          <form @submit.prevent="resetPassword" v-show="confirmCode">
            <div class="row">
              <div class="col-12">
                <div class="mb-3 text-start">
                  <label for="state" class="form-label">Confirm Code</label>
                  <input
                    type="text"
                    v-model.trim="code"
                    class="form-control form-control-sm"
                    id="code"
                    autocomplete="false"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="mb-3 text-start">
                  <label for="state" class="form-label">New Password</label>
                  <input
                    type="password"
                    v-model.trim="password"
                    class="form-control form-control-sm"
                    id="password"
                    autocomplete="false"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 mb-3 text-start">
                <label for="state" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  v-model.trim="confirmPassword"
                  class="form-control form-control-sm"
                  id="confirmPassword"
                  autocomplete="false"
                />
              </div>
            </div>

            <div class="d-grid col-12 mx-auto">
              <button class="btn btn-primary">Change Password</button>
            </div>
          </form>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import {
  validateResetPasswordForm,
  validateForgotPasswordForm,
} from "../../utils/validator";
import useAlert from "../../hooks/alert";

//imports userpool data from config
import { POOL_DATA } from "../../config/cognito";
import { useRouter } from "vue-router";

export default {
  setup() {
    //get access to Vuex router
    const router = useRouter();

    // reactive reference to data input fields
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const code = ref("");
    const confirmCode = ref(false);

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    //sends confirmation code to email you registered with
    function sendCode() {
      const validationData = validateForgotPasswordForm({
        username: username.value,
      });

      if (!validationData.valid) {
        message.value = validationData.message;
        messageStyleType.value = "alert-danger";
        return;
      }

      const userPool = new CognitoUserPool(POOL_DATA);
      const userData = {
        Username: username.value,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      console.log(cognitoUser);

      cognitoUser.forgotPassword({
        onSuccess: function(data) {
          // successfully initiated reset password request
          console.log(data);
          confirmCode.value = true;
        },
        onFailure: function(err) {
          setMessage(err.message, "alert-danger");
        },
      });
    }

    // performs the actual password resest
    function resetPassword() {
      if (!isValid()) {
        return;
      }

      const userPool = new CognitoUserPool(POOL_DATA);
      const userData = {
        Username: username.value,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmPassword(code.value, password.value, {
        onSuccess() {
          router.replace({
            name: "SignIn",
            params: {
              message: "You have successfully reset your password",
            },
          });
        },
        onFailure(err) {
          setMessage(err.message, "alert-danger");
        },
      });
    }

    function isValid() {
      const validationData = validateResetPasswordForm({
        code: code.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      if (!validationData.valid) {
        setMessage(validationData.message, "alert-danger");
        return false;
      }

      return true;
    }

    return {
      username,
      code,
      confirmPassword,
      sendCode,
      resetPassword,
      password,
      confirmCode,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
