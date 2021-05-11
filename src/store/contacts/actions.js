import axios from "axios";
// Update with you API Gateway endpoint
const api =
  "https://qbj694xaih.execute-api.us-east-1.amazonaws.com/prod/contact/";

/*
  Axios is being used to make calls to API
  https://github.com/axios/axios
  https://www.npmjs.com/package/vue-axios
*/
export default {
  // calls the API Gateway endpoint for getting all Contacts
  async fetchContacts({ commit, rootState }) {
    // creating header to pass jwtToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

    commit("setIsLoading", true);

    const response = await axios.get(api, {
      headers: headers,
    });

    if (response.status == "200") {
      commit("setContacts", response.data);
      commit("setIsLoading", false);
    }
  },
  // handles adding and updating contact on the backend in one method (POST & PATCH)
  async addContact({ commit, rootState }, payload) {
    commit("setIsLoading", true);

    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

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

    const response = await axios.post(api, contact, {
      headers: headers,
    });

    if (response.status == "200") {
      commit("addContact", payload);
      commit("setIsLoading", false);
    }
  },
  // calls the delete API Gateway endpoint for Contacts
  async deleteContact({ commit, rootState }, payload) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

    commit("setIsLoading", true);

    const response = await axios.delete(`${api}?id=${payload.id}`, {
      headers: headers,
    });

    if (response.status == "200") {
      commit("deleteContact", payload.id);
      commit("setIsLoading", false);
    }
  },
};
