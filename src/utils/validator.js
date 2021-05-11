/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/

/*
    Simple form validation methods
    More robust form validation can be implemented using a library such as Vuelidate (https://vuelidate.js.org/)
*/
export function validateAddContactForm(formData) {
  if (
    formData.address === "" ||
    formData.city === "" ||
    formData.country === "" ||
    formData.last_name === "" ||
    formData.state === "" ||
    formData.zip === "" ||
    formData.country === ""
  ) {
    return {
      valid: false,
      message: "All form fields are required",
    };
  }

  return { valid: true };
}

export function validataEditContactForm(formData) {
  console.log(formData);
  if (
    formData.address === "" ||
    formData.city === "" ||
    formData.country === "" ||
    formData.last_name === "" ||
    formData.state === "" ||
    formData.zip === "" ||
    formData.country === ""
  ) {
    return {
      valid: false,
      message: "All form fields are required",
    };
  }

  return { valid: true };
}

export function validateSignInForm(formData) {
  if (formData.username === "" || formData.password === "") {
    return {
      valid: false,
      message: "Username and password field must be filled in.",
    };
  }
  return { valid: true };
}

export function validateSignUpForm(formData) {
  if (
    formData.username === "" ||
    formData.password === "" ||
    formData.confirm_password === "" ||
    formData.email === ""
  ) {
    return {
      valid: false,
      message: "All form fields are required",
    };
  } else if (formData.confirm_password !== formData.password) {
    return {
      valid: false,
      message: "Passwords fields don't match",
    };
  }

  return { valid: true };
}

export function validateConfirmationForm(formData) {
  if (formData.username === "" || formData.code === "") {
    return {
      valid: false,
      message: "Username and confirmation code must be filled in.",
    };
  }

  return { valid: true };
}

export function validateForgotPasswordForm(formData) {
  if (formData.username === "") {
    return {
      valid: false,
      message: "Missing Username",
    };
  }

  return { valid: true };
}

export function validateResetPasswordForm(formData) {
  if (
    formData.code === "" ||
    formData.password === "" ||
    formData.confirmPassword === ""
  ) {
    return {
      valid: false,
      message: "All fields must be filled in",
    };
  } else if (formData.password !== formData.confirmPassword) {
    return {
      valid: false,
      message: "Passwords fields don't match",
    };
  }

  return { valid: true };
}
