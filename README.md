# Integrating Cognito with a web application using JavaScript SDK - Workshop

## What will be covered?

In this workshop you will walk-through building a single page web application that allows you to track contacts. The application will integrate with Cognito, API Gateway and store the application data DynamoDB. Below is an outline what you will be doing in the workshop:

1. Setup your development environment
2. Get application template from GitHub
3. Configure Cognito UserPool
4. Write code to complete functionality of application (all code will be provided)
5. Workshop Challenge

### Application pages

#### Authentication

- Sign Up page - will allow users to sign-up in your application
- Sign In page - will allow users to sign into in your application
- Confirm account page - allows users to confirm their account after sign-up
- Forgot Password - will allow users to reset their password (this page will already be coded for you completely)
- Enabled MFA - allows user to enable MFA on their account

#### Contacts

- Contact list - will display a list of contacts you have created
- Add New Contact form - will allow you to add a new contact
- Edit Contact form - will allow you to edit an existing contact
- Delete Contact form - will allow you to delete an existing contact

### Getting Data into Web App

- Learn how to send Cognito token information to an API Gateway endpoint
- Make calls to API Gateway endpoint and get data to populate in the web application.

### Web Technology Stack used in the workshop

In this workshop we use the Vue 3 web framework to build out our SPA (Single Page Application). You do not need to be an expert in the framework to complete the workshop. We will provide all the code needed to complete the workshop, and have commented the code to make it easier to understand.

**Note:** Having an understanding of JavaScript frameworks such as React and Angular would be beneficial. As you build out the application our focus will be on the JavaScript code. We will not be diving deep into the user-interface design as part of this workshop. All of the UI has been developed for you, so that you can concentrate on writing code that interacts with the JavaScript Cognito SDK.

### Resource Links

- [Get more information about Vue 3](https://v3.vuejs.org/)

### Next Steps

In the next section you will walk-through accessing your development environment for th workshop, and retrieving the source code for the workshop

## [Accessing Development Environment](docs/DevSetup.md)
