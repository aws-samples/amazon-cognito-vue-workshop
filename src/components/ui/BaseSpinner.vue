<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <!-- Base spinner component used throughout UI -->
  <div class="d-flex justify-content-center text-primary m-5">
    <div class="spinner-border" role="status" />
    <span class="ms-3"><slot></slot></span>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
