<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <div class="container">
    <div class="col-7 offset-md-3">
      <base-message :type="messageStyleType" v-if="message">{{
        message
      }}</base-message>
      <base-card v-if="contact">
        <template v-slot:title>
          <i class="bi bi-person-circle me-3"></i> Edit Contact
        </template>
        <template v-slot:body>
          <form @submit.prevent="updateContact">
            <div class="row">
              <div class="col-6">
                <div class="mb-3 text-start">
                  <label for="first-name" class="form-label">First Name</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="first-name"
                    v-model="contact.first_name"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3 text-start">
                  <label for="last-name" class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="last-name"
                    v-model="contact.last_name"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mb-3 text-start">
                  <label for="address" class="form-label">Address</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="address"
                    v-model="contact.address"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3 text-start">
                  <label for="city" class="form-label">City</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="city"
                    v-model="contact.city"
                  />
                </div>
              </div>
              <div class="col-2">
                <div class="mb-3 text-start">
                  <label for="state" class="form-label">State</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="state"
                    v-model="contact.state"
                  />
                </div>
              </div>
              <div class="col-3">
                <div class="mb-3 text-start">
                  <label for="zip" class="form-label">Zip</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="zip"
                    v-model="contact.zip"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <div class="mb-3 text-start">
                  <label for="country" class="form-label">Country</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="country"
                    v-model="contact.country"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="text-start">
              <button
                class="btn btn-primary"
                type="button"
                disabled
                v-if="isLoading"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                {{ buttonText }}
              </button>

              <button
                class="btn btn-danger me-2"
                @click.prevent="cancel"
                v-if="!isLoading"
              >
                <i class="bi bi-person-plus-fill me-2"></i>Cancel
              </button>

              <button class="btn btn-primary" v-if="!isLoading">
                <i class="bi bi-person-plus-fill me-2"></i>Update Contact
              </button>
            </div>
          </form>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { validataEditContactForm } from "../../utils/validator";
import useAlert from "../../hooks/alert";

export default {
  setup() {
    // create a reference to Vuex store
    const store = useStore();

    //get access to Vuex router
    const router = useRouter();
    const route = useRoute();

    const buttonText = ref("Loading ...");

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    const contact = computed(function() {
      return store.getters.getContacts.find(
        (contact) => contact.id === route.params.id
      );
    });

    onBeforeMount(function() {
      store.dispatch("fetchContacts");
    });

    async function updateContact() {
      if (!isValid()) {
        return;
      }

      buttonText.value = "Saving ...";

      await store
        .dispatch("addContact", {
          id: route.params.id,
          address: contact.value.address,
          city: contact.value.city,
          country: contact.value.country,
          first_name: contact.value.first_name,
          last_name: contact.value.last_name,
          state: contact.value.state,
          zip: contact.value.zip,
        })
        .then(() => {
          router.push({
            name: "Contacts",
            params: { message: "You have updated contact" },
          });
        })
        .catch(() => {
          setMessage(
            "Problem adding contact. Please try again later",
            "alert-danger"
          );
          store.dispatch("setIsLoading", false);
        });
    }

    const isLoading = computed(function() {
      return store.getters.getIsLoading;
    });

    function cancel() {
      router.push("/contacts");
    }

    function isValid() {
      const validationData = validataEditContactForm(contact.value);

      if (!validationData.valid) {
        setMessage(validationData.message, "alert-danger");
        return false;
      }

      return true;
    }
    return {
      updateContact,
      contact,
      isLoading,
      buttonText,
      message,
      messageStyleType,
      cancel,
    };
  },
};
</script>

<style></style>
