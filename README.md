# Firebase Authentication Template for React
This project provides simple authentication and authentication template based on [Firebase](https://firebase.google.com/?gclid=CjwKCAjwnrjrBRAMEiwAXsCc4_so3RS_hc7nj52X6HOQbWuMXw7TFv1mcZFit6LCGEponmE4TX1XdxoCbGMQAvD_BwE)
## Get Started
clone repo and put `.env` folder inside the root of the clonned repo.
```
git clone https://github.com/PetrDvoracek/react-firebase-auth.git
git cd react-firebase-auth
touch .env
```
`.env` folder holds variables neccesary for operations with firebase API. The structure is following
```
REACT_APP_API_KEY=***apiKey***
REACT_APP_AUTH_DOMAIN=***projectId***.firebaseapp.com
REACT_APP_DATABASE_URL=https://***projectId***.firebaseio.com
REACT_APP_PROJECT_ID=***projectId***
REACT_APP_STORAGE_BUCKET="***projectId***.appspot.com",
REACT_APP_MESSAGING_SENDER_ID=***messagingSenderId***
REACT_APP_ID=***appId** 
```
> DO NOT STORE `.env` IN GIT REPO! It contains secret informations.
This is all you have to do to use the template. run `npm install` and `npm start`, go on `http://localhost:3000` in your browser.
