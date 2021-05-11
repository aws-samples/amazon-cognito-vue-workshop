/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import { ref } from "vue";

// hooked used to set alert messages in UI
export default function useAlert() {
  const message = ref("");
  const messageStyleType = ref("alert-success");

  function setMessage(msg, type) {
    message.value = msg;
    messageStyleType.value = type;
  }

  return {
    message,
    messageStyleType,
    setMessage,
  };
}
