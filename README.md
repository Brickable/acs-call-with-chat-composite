---
page_type: sample
languages:
  - javascript
  - nodejs
products:
  - azure
  - azure-communication-services
---

# Group Call and Chat Sample

## Overview

This is a sample application designed to demonstrate how the `@azure/communication-react` package can be used to create a comprehensive calling and chatting experience. The client-side application features a user-friendly interface built using React. Complementing this frontend is a NodeJS web application powered by ExpressJS, responsible for various functions such as generating new user tokens for every chat participant.

The baseline for this project was the [Chat Sample](https://github.com/Azure-Samples/communication-services-web-chat-hero). This project extensively reuses the infrastructure skeleton and its NodeJS portion (located in the `Server` folder). The main difference is that it utilizes the `CallWithChatComposite` instead of the `ChatComposite` used in the Baseline project. Additionally, the React app has been significantly simplified. The app also provides the option to join an existing Microsoft Teams meeting when a link is provided

## Useful links

- [Azure Communication Services UI Library](https://azure.github.io/communication-ui-library/).
- [ACS UI Library](https://azure.github.io/communication-ui-library/?path=/docs/overview--page)
- [Call Sample](https://github.com/Azure-Samples/communication-services-web-calling-hero)
- [Chat Sample](https://github.com/Azure-Samples/communication-services-web-chat-hero)
- [Azure Communication Services - UI Library](https://azure.github.io/communication-ui-library/) - To learn more about what the `@azure/communication-react` package offers.
- [Azure Communication Chat SDK](https://docs.microsoft.com/en-us/azure/communication-services/concepts/chat/sdk-features) - To learn more about the chat web sdk
- [Create an Azure Communication Resources](https://docs.microsoft.com/en-us/azure/communication-services/quickstarts/create-communication-resource)
- [FluentUI](https://developer.microsoft.com/en-us/fluentui#/) - Microsoft powered UI library
- [React](https://reactjs.org/) - Library for building user interfaces

## Prerequisites

- [Visual Studio Code (Stable Build)](https://code.visualstudio.com/download)
- [Node.js (~18)](https://nodejs.org/en/download)
- Create an Azure account with an active subscription. For details, see [Create an account for free](https://azure.microsoft.com/free/?WT.mc_id=A261C142F).
- Create an Azure Communication Services resource. For details, see [Create an Azure Communication Resource](https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource). You'll need to record your resource **connection string** for this quickstart.

## Code structure

- ./Chat/src/app: Where the client code lives.
- ./Chat/src/app/App.tsx: Entry point into the App. Act as orchestrator that manage which component should render based on the app screen state
- ./Chat/src/app/ConfigurationScreen.tsx: Where to set your name and ms teams meeting url if is to join to one
- ./Chat/src/app/CallScreen.tsx: The Call screen wrapping `CallWithChatComposite` all funtionality.
- ./Chat/src/app/ErrorScreen.tsx: The screen when an error occurs
- ./Chat/src/app/LoadingScreen.tsx: Helper component of a Loading screen used when an Call settings are being generated asynchronously
- ./Chat/src/app/InputField.tsx: Helper component of an input text with label and error message thats is being used on `ConfigurationScreen` The screen when an error occurs

- ./Chat/src/app/styles: Where the app store the styles
- ./Chat/src/app/utils: Where the app store its utils

- ./Server: server code
- ./Server/appsettings.json: Where to put your azure communication services connection string

## Before running the sample for the first time

1. Open an instance of PowerShell, Windows Terminal, Command Prompt or equivalent and navigate to the directory that you'd like to clone the sample to.
2. `git clone XXX`
3. Get the `Connection String` from the Azure portal. For more information on connection strings, see [Create an Azure Communication Resources](https://docs.microsoft.com/en-us/azure/communication-services/quickstarts/create-communication-resource)
4. Once you get the `Connection String`, Add the connection string to the **Server/appsettings.json** file found under the Chat folder. Input your connection string in the variable: `ResourceConnectionString`.
5. Once you get the `Endpoint`, add the endpoint string to the **Server/appsetting.json** file. Input your endpoint in the variable: `EndpointUrl`.
6. Get the `identity` from the Azure portal. Click on `Identities & User Access Tokens` in Azure portal. Generate a user with `Chat` scope.
7. Once you get the `identity` string, add the identity string to the **Server/appsetting.json** file. Input your identity string in the variable: `AdminUserId`. This is the server user to add new users to the chat thread.

## Local run

1. Set your connection string in `Server/appsettings.json`
2. Set your endpoint URL string in `Server/appsettings.json`
3. Set your adminUserId string in `Server/appsettings.json`
4. `npm run setup` from the root directory
5. `npm run start` from the root directory

## Publish to Azure

1. `npm run setup`
2. `npm run build`
3. `npm run package`
4. Use the [Azure extension](https://code.visualstudio.com/docs/azure/extensions) and deploy the `Chat/dist` directory to your app service
