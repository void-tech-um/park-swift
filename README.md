# park-swift
Repository for the Park Swift project team within VOID Tech at the University of Michigan

First go to Park-Swift app directory:

`cd Park-Swift`

Then run the installer script:

`./bin/install`

This installer script executes the following lines:

`npm install`

`npm install @react-navigation/material-top-tabs react-native-tab-view`

`npx expo install react-native-pager-view`

`nvm install node --reinstall-packages-from=current`

Lastly, to start the app use:

`npx expo start` or `npx expo start --tunnel` (use --tunnel if `npx expo start` doesn't work on Windows). Also use `npx expo start --tunnel` on Mac if `npx expo start` doesn't work and you have an error message similar to below:

[Alt text](<tunnel-issue-mac.png>)