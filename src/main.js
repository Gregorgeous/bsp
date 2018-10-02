import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase"
import config from './.firebaseConfig.json'

Vue.config.productionTip = false

let app;
var myFirebase  = firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    // User is signed in.
    app = new Vue({
      store: store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});