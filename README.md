# park-swift
Repository for the Park Swift project team within VOID Tech at the University of Michigan

First go to Park-Swift app directory:

`cd Park-Swift`

Then run the installer script:

`./bin/install`

This installer script executes the following lines:

`npm install`

`npm install @react-navigation/material-top-tabs react-native-tab-view`

`nvm install node --reinstall-packages-from=current`

`npx expo install react-native-pager-view`

Lastly, to start the app use:

`npx expo start` or `npx expo start --tunnel` (use --tunnel if `npx expo start` doesn't work on Windows). 

Also, use `npx expo start --tunnel` on Mac if `npx expo start` doesn't work and you have an error message similar to below:

[Tunnel Error Message](<tunnel-issue-mac.png>)

If you are having an error that says nvm is not installed please refer to [NVM installation instructions](<https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating>)