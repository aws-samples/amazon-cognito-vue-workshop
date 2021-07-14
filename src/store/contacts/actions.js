/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import axios from "axios";

// Update with your API Gateway endpoint. This is the Invoke URL you copied after deploying your API.
const api = "https://your-api-gateway-endpoint-goes-here/contact/";

/*
  Axios is being used to make calls to API
  https://github.com/axios/axios
  https://www.npmjs.com/package/vue-axios
*/
export default {
  // calls the API Gateway endpoint for getting all Contacts
  async fetchContacts({ commit, rootState }) {
    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

    commit("setIsLoading", true);

    /* 
    makes call to the API Gateway endpoint by passing 
    api URL and header object via GET request
    */
    const response = await axios.get(api, {
      headers: headers,
    });

    /*
    if status code is 200 then data is loaded in store and
    activity spinner UI element is hidden
    */
    if (response.status == "200") {
      commit("setContacts", response.data);
      commit("setIsLoading", false);
    }
  },
  // handles adding and updating contact on the backend in one method (POST & PATCH)
  async addContact({ commit, rootState }, payload) {
    commit("setIsLoading", true);

    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

    //holds contact object
    const contact = {
      id: payload.id,
      owner_id: payload.owner_id,
      address: payload.address,
      city: payload.city,
      country: payload.country,
      first_name: payload.first_name,
      last_name: payload.last_name,
      state: payload.state,
      zip: payload.zip,
    };

    /* 
    makes call to the API Gateway endpoint by passing 
    api URL and header object via POST request
    */
    const response = await axios.post(api, contact, {
      headers: headers,
    });

    /*
    if status code is 200 then data is loaded in store and
    activity spinner UI element is hidden
    */
    if (response.status == "200") {
      commit("addContact", payload);
      commit("setIsLoading", false);
    }
  },
  // calls the delete API Gateway endpoint for Contacts
  async deleteContact({ commit, rootState }, payload) {
    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

    commit("setIsLoading", true);

    /* 
    makes call to the API Gateway endpoint by passing 
    api URL and header object via DELETE request
    */
    const response = await axios.delete(`${api}?id=${payload.id}`, {
      headers: headers,
    });

    /*
    if status code is 200 then data is loaded in store and
    activity spinner UI element is hidden
    */
    if (response.status == "200") {
      commit("deleteContact", payload.id);
      commit("setIsLoading", false);
    }
  },
};
