/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0  
*/

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseCard from "./components/ui/BaseCard";
import BaseSpinner from "./components/ui/BaseSpinner";
import BaseMessage from "./components/ui/BaseMessage";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .component("base-card", BaseCard)
  .component("base-spinner", BaseSpinner)
  .component("base-message", BaseMessage)
  .mount("#app");
