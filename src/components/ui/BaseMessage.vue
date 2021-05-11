<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
-->
<template>
  <!-- Base alert component used throughout UI to display messages -->
  <div
    class="alert"
    :class="[styleType, 'alert-dismissible fade show', 'shadow']"
    role="alert"
  >
    <slot></slot>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["type"],
  setup(props) {
    const styleType = computed(function() {
      return props.type;
    });

    return { styleType };
  },
};
</script>

<style></style>
