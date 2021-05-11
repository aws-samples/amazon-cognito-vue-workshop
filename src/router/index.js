/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from "@/views/auth/SignUp";
import SignIn from "@/views/auth/SignIn";
import ForgotPassword from "@/views/auth/ForgotPassword";
import Confirm from "@/views/auth/Confirm";
import NotFound from "@/views/NotFound";
import Settings from "@/views/auth/Settings";
import Contacts from "@/views/contacts/Contacts";
import AddContact from "@/views/contacts/AddContact";
import EditContact from "@/views/contacts/EditContact";
import DeleteContact from "@/views/contacts/DeleteContact";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    component: Contacts,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/signup", name: "SignUp", component: SignUp },
  { path: "/signin", name: "SignIn", component: SignIn },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  { path: "/confirm", name: "Confirm", component: Confirm },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/delete-contact/:id",
    name: "DeleteContact",
    component: DeleteContact,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-contact/:id",
    name: "EditContact",
    component: EditContact,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-contact",
    name: "AddContact",
    component: AddContact,
    beforeEnter: isAuthenticated,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function isAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("/signin");
  }
}

export default router;
