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
          Confirm Account
        </template>
        <template v-slot:body>
          <form @submit.prevent="confirmCode">
            <div class="row">
              <div class="col-12">
                <div class="mb-3 text-start">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    v-model.trim="username"
                    autocomplete="false"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <div class="mb-3 text-start">
                  <label for="code" class="form-label">Code</label>
                  <input
                    type="text"
                    id="code"
                    v-model.trim="code"
                    autocomplete="false"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 col-12 mx-auto">
              <button class="btn btn-primary">
                <i class="bi bi-person-plus me-2"></i> Confirm Account
              </button>
            </div>
          </form>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { validateConfirmationForm } from "../../utils/validator";
import useAlert from "../../hooks/alert";

//imports userpool data from config
import { POOL_DATA } from "../../config/cognito";

export default {
  setup() {
    // create a reference to Vuex store
    // const store = useStore();

    //get access to Vuex route
    const route = useRoute();

    //get access to Vuex router
    const router = useRouter();

    // reference to data input fields
    const code = ref("");
    const username = ref(route.query.username);

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    // confirms uses code when they sign up for an account
    async function confirmCode() {
      if (!isValid()) {
        return;
      }

      try {
        //sets up Cognito User pool data
        const userPool = new CognitoUserPool(POOL_DATA);
        const userData = {
          Username: username.value,
          Pool: userPool,
        };

        // creates a Cognito User object based on username and user pool info
        const cognitUser = new CognitoUser(userData);
        console.log(cognitUser);

        // calls the Cognito confirm registration method
        await cognitUser.confirmRegistration(
          code.value,
          true,
          (err, result) => {
            if (err) {
              setMessage(err.message, "alert-danger");
              return;
            }

            router.replace({
              name: "SignIn",
              params: {
                message: "You have successfully confirmed your account",
              },
            });

            console.log(result);
          }
        );
      } catch (ex) {
        alert(ex.message);
      }
    }

    function isValid() {
      const validationData = validateConfirmationForm({
        code: code.value,
        username: username.value,
      });

      if (!validationData.valid) {
        setMessage(validationData.message, "alert-danger");
        return false;
      }

      return true;
    }

    return {
      confirmCode,
      code,
      username,
      message,
      messageStyleType,
      isValid,
    };
  },
};
</script>

<style></style>
