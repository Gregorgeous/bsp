BŚP app.

Current setup: vue.js, vuex, vue-router, Firebase

UI design heavily based on @ajkln's themes from https://html5up.net/ ("Helios" & "Identity").

# Installation guide:
1. Install node.js from https://nodejs.org/en/. 
2. You need to set-up your firebase project and connect it with an app (otherwise you won't be able to create your own authorisation accounts and, in result, be able to pass through login form) <br />
a. Once you've created new project for this app inside Firebase, go to "authentication" tab and click the "web setup" button on the right hand side. <br />
b. Create a file called "fbConfig.json" inside "{rootDir}/src" with a following structure:  <br />
``` bash
{
  "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "authDomain": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "databaseURL": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "projectId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "storageBucket": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "messagingSenderId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```
 c. paste values of your fb config in place of the above ones
3. Run the following:
``` 
npm install
npm run serve
```
4. Enter localhost:8080.
