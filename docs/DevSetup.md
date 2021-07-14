# Accessing Development Environment - (AWS Cloud9)

In this section you will walk-through accessing your development and environment, and getting the code to run the workshop

After logging into your Event Engine AWS account you will navigate to the **_AWS Cloud9_** service. You should then see a screen similar to the one below.

![npm run](../docs/images/dev-env-setup/cloud9-1.png)

Click the **Open IDE** button. It may take a few seconds to load the Cloud9 IDE. Once thee Cloud9 loads you should see the screen below.

**Note**: You may have a different theme color.

![npm run](../docs/images/dev-env-setup/cloud9-2.png)

## Getting workshop code

Next run the following command in your terminal windows at the bottom of the Cloud9 IDE.

```shell
git clone https://github.com/aws-samples/amazon-cognito-vue-workshop.git
```

![npm run](../docs/images/dev-env-setup/cloud9-3.png)

After you have successfully clone the code from Github you should see the screen below.

![npm run](../docs/images/dev-env-setup/cloud9-4.png)

Now that you have the code for the workshop change into the directory that code exist in. You can do this by running thw below command in the Cloud9 terminal window.

```shell
cd amazon-cognito-vue-workshop
```

After you have changed directories your terminal should show you in the directory seen in the image below.
![npm run](../docs/images/dev-env-setup/cloud9-5.png)

You are now in the source code directory. Next you will need to run the command below to load the dependencies needed by project.

```shell
npm install
```

After you have ran the above command you should see a screen similar to the one below.

![npm run](../docs/images/dev-env-setup/cloud9-6.png)

**Note:** Ignore any warnings that you receive after running the _npm install_ command. For the sake of this workshop we will not focus on any of the dependency libraries that are installed.

Now that you have installed all needed modules to run the workshop you will start the development server. To start the development server run the command below.

```
npm run serve
```

This command will start a development web server to test your code against. After you have run the command above your development web serve should be running. Your terminal should display the output you see below.

![npm run](../docs/images/dev-env-setup/cloud9-7.png)

To see your application running click the **_Preview_** tab at the top of the screen, and then select **_Preview Running Application_**. See screenshot below.

![npm run](../docs/images/dev-env-setup/cloud9-8.png)

Your app may start in bottom of the Cloud9 IDE. See example below of how your application may initially load.

![npm run](../docs/images/dev-env-setup/cloud9-9.png)

You can expand the application into a new tab by clicking the icon in the corner of your application window. See image below of icon to click to open application in new tab. Click the expand icon to the right of the **Browser** button. This will allow you to test you application in full screen mode.

![npm run](../docs/images/dev-env-setup/cloud9-11.png)

Once you have expanded the application in a separate tab you should see the below application running.

![npm run](../docs/images/dev-env-setup/cloud9-10.png)

## Next Steps

Now that you have the application running you will setup your Cognito User Pool.

## [Cognito User Pool setup](UserPoolSetup.md)
