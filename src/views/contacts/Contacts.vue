<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0  
-->
<template>
  <div class="container">
    <the-contacts></the-contacts>
  </div>
</template>

<script>
import TheContacts from '../../components/contacts/ContactsList.vue';
export default {
  components: { TheContacts },
  name: "Contacts",
};
</script>

<style>
</style>