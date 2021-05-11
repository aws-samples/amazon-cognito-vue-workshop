<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <!-- Base card component used throughout UI -->
  <div class="card shadow p-3 mb-5 bg-body">
    <div class="card-body">
      <h5 class="card-title text-start">
        <slot name="title"></slot>
      </h5>
      <hr />
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
