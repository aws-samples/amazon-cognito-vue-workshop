# Configure application to use Cognito User Pool

In this section we will setup the application to communicate with the Cognito User Pool. In order to do this we will need two piece of information about the user pool. You will need the **_Pool ID_** and the **_App Client ID_**. Next you will open the JavaScript file that will use the pool ID and app client ID.

Be sure you have the project open in your favorite text editor IDE. Now navigate to the following JavaScript file **/src/config/cognito.js** in your project.

- The pool ID represents an unique ID that identifies your user pool

You should see the following code.

```js
export const POOL_DATA = {
  UserPoolId: "replace-user-pool-id-here",
  ClientId: "replace-app-client-id-here",
};
```

To get this information you will navigate back to the Cognito User Pool you created.

You should then see your Pool ID. See image below for example.

image

Now you will copy the Pool ID and paste that in the code where it says:

```js
"replace-user-pool-id-here",
```

Next you navigate to the **_App Client Settings_** for your Cognito User Pool. See image below for example.

image-here

Now you will copy the Pool ID and paste that in the code where it says:

```js
"replace-app-client-id-here",
```

You have now successfully configured your application to communicate with the Cognito User Pool you setup. Now you will be setting up the code to allow users to sign-up and and sign into your application.
