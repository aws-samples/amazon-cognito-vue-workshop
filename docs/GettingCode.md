## Getting Workshop Code

You will next get the code to run the workshop by cloning the following Git repo. Run the following command in a preferred location on locally

```
git clone https://github.com/aws-samples/amazon-cognito-vue-workshop
```

You can also download a zip file of the repo here:

https://github.com/aws-samples/amazon-cognito-vue-workshop/archive/refs/heads/main.zip

### Install dependencies

Navigate to where you have cloned the code and run the below command in your terminal or commandline. This will install all the needed node modules to run the application.

```
npm install
```

### Run the project

Run the following command in your terminal or commandline to start the development server.

```
npm run serve
```

You should then see a message similar to the one below:

![npm run](../docs/images/npm-run.png)

If you would like to stop the development server press "control+C"

### Current App state

At this time if you navigate to the application URL where it says your **"App running at"**, the page would be blank. The reason is you have not yet setup **_Pool ID_** and the **_App Client ID_** in the config file.

To see the exact error that you are getting open the developer console and click the **_Source_** tab, will see the below error.
image here

This is what you will do in the next section.

[Configure application to use Cognito User Pool](docs/CognitoConfig.md)
