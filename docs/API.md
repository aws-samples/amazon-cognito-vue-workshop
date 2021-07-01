# Configuring API Gateway endpoint Authorization

In this section you walk-through how to update the API Gateway endpoints, and add Cognito authorization. This will allow your code to make calls to the API Gateway endpoints by passing the **Cognito idToken** in the **Authorization** header of the API request.

Below we will briefly walk-through a code sippet of what it looks when calling the API endpoint with a Cognito idToken.

## API Gateway request - code snippet

This code can be found in the following file **src/store/contacts/actions.js**. The code below fetches all of the contacts the user has added to their account.

```js
async fetchContacts({ commit, rootState }) {
    // creates header object to pass Cognito idToken with request to API endpoint
    const headers = {
      "Content-Type": "application/json",
      Authorization: rootState.authModule.idToken,
    };

    commit("setIsLoading", true);

    /*
    makes call to the API Gateway endpoint by passing
    api URL and header object via GET request
    */
    const response = await axios.get(api, {
      headers: headers,
    });

    /*
    if status code is 200 then data is loaded in store and
    activity spinner UI element is hidden
    */
    if (response.status == "200") {
      commit("setContacts", response.data);
      commit("setIsLoading", false);
    }
}
```

Now that you have an idea of how the code makes call to the API endpoint with the Cognito idToken you will configure the API Gateway endpoint.

## Configure API Gateway endpoints

Go back into the AWS console and search for the API Gateway service. Once you navigate the API Gateway service you should see the following screen.

![npm run](../docs/images/api-gateway/api-1.png)

Click on **ContactAPI** and you should see the following screen.

![npm run](../docs/images/api-gateway/api-2.png)

1.  Next click on **DELETE** under the **_Resources_** panel. After you click on **DELETE** you should see the screen below.

![npm run](../docs/images/api-gateway/api-3.png)

2.  Now you will click on the link that says **Method Request** at the top of the panel seen in the screen below.

![npm run](../docs/images/api-gateway/api-4.png)

The following screen should now appear.

![npm run](../docs/images/api-gateway/api-5.png)

3.  Next click the pencil icon next **Authorization**, and select the name of your **Cognito Authorizer**. You should see a screen similar to the one below. The name of your authorizer will be different. In this example the name of the authorizer is **cognito_authorizer**.

![npm run](../docs/images/api-gateway/api-6.png)

4. After you have selected your authorizer in the drop down list click the checkbox icon to save your changes.

![npm run](../docs/images/api-gateway/api-7.png)

5.  Once you have saved your changes you should see a screen similar to the one below.

![npm run](../docs/images/api-gateway/api-8.png)

Next complete steps 1 through 5 for the **GET** and **POST** actions

![npm run](../docs/images/api-gateway/api-9.png)

After you have added the Cognito authorizer to the **DELETE**, **GET**, **POST** actions for the API resource your application should now be able to communicate with the API Gateway endpoint.
