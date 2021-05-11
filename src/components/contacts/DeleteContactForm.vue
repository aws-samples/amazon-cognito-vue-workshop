<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <div class="container">
    <div class="col-6 offset-md-3">
      <base-message :type="messageStyleType" v-if="message">{{
        message
      }}</base-message>
      <base-card>
        <template v-slot:title>
          Confirm Contact Deletion
        </template>
        <template v-slot:body>
          <div>
            <base-spinner v-if="loading">{{ buttonText }}</base-spinner>
            <p v-if="contact && !loading" class="mt-5 mb-5">
              Are you sure you would like to delete the contact for
              <strong>{{ contact.first_name }} {{ contact.last_name }}</strong
              >?
            </p>
            <hr />
            <div class="row" v-if="!loading">
              <div class="col-6">
                <button class="btn btn-primary" @click="cancel">Cancel</button>
              </div>
              <div class="col-6">
                <button
                  class="btn btn-danger"
                  type="button"
                  disabled
                  v-if="deleting"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Deleting ...
                </button>

                <button
                  class="btn btn-danger"
                  @click="deleteContact"
                  v-if="!loading"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseCard from "@/components/ui/BaseCard";
import useAlert from "../../hooks/alert";

export default {
  components: { BaseCard },
  setup() {
    // create a reference to Vuex store
    const store = useStore();

    //get access to Vuex route
    const route = useRoute();

    //get access to Vuex router
    const router = useRouter();

    const id = ref(route.params.id);
    const buttonText = ref("Loading ...");
    const deleting = ref(false);
    const loading = ref(false);

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    const isLoading = computed(function() {
      return store.getters.getIsLoading;
    });

    async function deleteContact() {
      console.log(loading);

      buttonText.value = "Deleting ...";
      try {
        await store.dispatch("deleteContact", { id: id.value });
        router.replace({
          name: "Contacts",
          params: { message: "You have deleted contact" },
        });
      } catch (err) {
        setMessage(
          "Problem deleting contact. Please try again later",
          "alert-danger"
        );
        store.dispatch("setIsLoading", false);
      }
    }

    function cancel() {
      router.replace("/contacts");
    }

    onBeforeMount(function() {
      store.dispatch("fetchContacts");
    });

    const contact = computed(function() {
      return store.getters.getContacts.find(
        (contact) => contact.id === route.params.id
      );
    });

    return {
      loading: isLoading,
      contact,
      id,
      deleteContact,
      cancel,
      buttonText,
      deleting,
      messageStyleType,
      message,
    };
  },
};
</script>

<style></style>
