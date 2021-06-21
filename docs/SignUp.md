# Sign-up code setup

In this section you will setup the code that is needed to allow users to sign up for a new account in your application. Once you finish this section you have a completely functioning sign-up form that you see below.

### Sign-up form

![npm run](../docs/images/signup-form.png)

## Note about workshop code explanations

As you work through the workshop we will not explain every line of code, but only focus on the core piece of code that is being used to interact with Cognito to get that particular form functioning.

## Sign-up code explanation

- In the first part of the code we get create a user pool object that references the Cognito user pool data that we setup in ##[Configure application to use Cognito User Pool](CognitoConfig.md) section.
- Next an array/list of user pool attributes are created

  - This array of attributes will be passed to the sign-up method. In this example we are only passing the email when the user signs up. You can pass other attributes such as first name or phone.

## Sign-up code

```js
const userPool = new CognitoUserPool(POOL_DATA);

// sets Cognito sign up use attributes
const attrList = [];
const emailAttribute = {
  Name: "email",
  Value: email.value,
};

const phoneAttribute = {
  Name: "phone_number",
  Value: "+12145294079",
};

//adds attributes to list/array
attrList.push(new CognitoUserAttribute(emailAttribute));
attrList.push(new CognitoUserAttribute(phoneAttribute));

await userPool.signUp(
  username.value,
  password.value,
  attrList,
  null,
  (err, result) => {
    if (err) {
      setMessage(err.message, "alert-danger");
      return;
    }

    console.log(result);
    router.replace({
      name: "Confirm",
      query: { username: username.value },
    });
  }
);
```
