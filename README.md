# park-swift
Repository for the Park Swift project team within VOID Tech at the University of Michigan

First go to Park-Swift app directory:

`cd Park-Swift`

Then run the installer script:

`./bin/install`

If the installer script doesn't work and you get an issue stating that either node isn't installed, or that it is the wrong version please run the following two commands and then try to run the installer script again:

`nvm install node --reinstall-packages-from=current`

`npm install`

Lastly, to start the app use:

`npx expo start` or `npx expo start --tunnel` (use --tunnel if `npx expo start` doesn't work on Windows). 

Also, use `npx expo start --tunnel` on Mac if `npx expo start` doesn't work and you have an error message similar to below:

[Tunnel Error Message](<tunnel-issue-mac.png>)

If you are having an error that says nvm is not installed please refer to [NVM installation instructions](<https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating>)

If you are having weird errors with expo failing to recognize old dependencies are removed, 
clear the expo cache with `expo r -c`