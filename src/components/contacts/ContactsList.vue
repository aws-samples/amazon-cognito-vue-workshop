<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <div class="container">
    <base-message :type="messageStyleType" v-if="message">{{
      message
    }}</base-message>
    <base-card>
      <template v-slot:title>
        <i class="bi bi-person-fill me-2"></i>My Contacts
      </template>
      <template v-slot:body>
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Country</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contact_data" :key="contact.id">
              <td>
                {{ contact.first_name }}
              </td>
              <td>
                {{ contact.last_name }}
              </td>
              <td>
                {{ contact.country }}
              </td>
              <td>
                <router-link
                  v-if="contact.id"
                  :to="{
                    name: 'EditContact',
                    params: { id: contact.id },
                  }"
                >
                  <i class="bi bi-pencil me-3"></i>
                </router-link>
                <router-link
                  v-if="contact.id"
                  :to="{ name: 'DeleteContact', params: { id: contact.id } }"
                >
                  <i class="bi bi-trash-fill"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="alert alert-primary"
          role="alert"
          v-if="contact_data.length < 1 && !isLoading"
        >
          You have not added any contacts yet
        </div>
        <base-spinner v-if="isLoading">Loading ...</base-spinner>
        <div class="text-end">
          <router-link
            class="btn btn-primary"
            :to="{ name: 'AddContact', params: { mode: 'Add' } }"
            ><i class="bi bi-person-plus me-1"></i>Add Contact</router-link
          >
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive, computed, onMounted } from "vue";
import useAlert from "../../hooks/alert";

export default {
  setup() {
    // create a reference to Vuex store
    const store = useStore();
    const contacts = reactive([]);

    //get access to Vuex router
    const router = useRouter();
    const route = useRoute();

    //sets up hook for message alerting
    const { message, messageStyleType, setMessage } = useAlert();

    async function loadContacts() {
      try {
        await store.dispatch("fetchContacts");
      } catch (err) {
        setMessage("Problem loading contacts.", "alert-danger");
        store.dispatch("setIsLoading", false);
      }
    }

    function addContact() {
      router.push("/add-contact");
    }

    function deleteContact(id) {
      router.push(`/delete-contact/${id}`);
    }

    const contact_data = computed(function() {
      return store.getters.getContacts;
    });

    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
      loadContacts();
    });

    const isLoading = computed(function() {
      return store.getters.getIsLoading;
    });

    return {
      useStore,
      contacts,
      contact_data,
      addContact,
      deleteContact,
      isLoading,
      loadContacts,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>
