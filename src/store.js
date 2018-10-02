import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingState: false,
    patrolAccount: {},
  },
  mutations: {
    changeLoadingState(state, boolStatus) {
      state.loadingState = boolStatus;
    },
    saveAccountInStore(state, newAccountData) {
      state.patrolAccount = newAccountData;
    },
    logout(state) {
      state.patrolAccount = null;
    }
  },
  actions: {
    register({
      commit
    }, payload) {
      commit('changeLoadingState', true);
      return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((account) => {
          account.user.updateProfile({
            displayName: payload.patrolName
          });
          let newAccountData = {
            patrolName: payload.patrolName,
            score: 0
          }
          return firebase.database()
            .ref(`accounts/${payload.patrolName}`)
            .set(newAccountData)
            .then(() => {
              commit('saveAccountInStore', newAccountData);
              commit('changeLoadingState', false);
              return true;
            })
            .catch((err) => {
              console.log("Problem przy zapisywaniu patrolu na liście kont w grze w bazie danych ! ");
              console.log(err);
              commit('changeLoadingState', false);
              return false;
            });
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Problem przy rejestracji ! ");
          console.log(errorCode, errorMessage);
          commit('changeLoadingState', false);
          return false;
        })
    },
    signIn({
      commit,
      state
    }, payload) {
      commit('changeLoadingState', true);
      if (!payload.persistentLogin) {
        // IDEA [G.R.]: If user doesn't want to login persistenly, we set auth obj persistence to SESSION 
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(function () {
            return login();
          })
      } else {
        // NOTE [G.R.]: by default firebase keeps auth obj persistence as LOCAL, so we don't need to set any persistence here. 
        return login();
      }

      function login() {
        return firebase.auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((account) => {
            console.log("this is the account data received upon login");
            console.log(account);
            // NOTE [G.R.]: Dzięki temu, że zapisaliśmy displayName użytkownikowi w czasie rejestracji na nazwę jego patrolu, możemy zrobić fetch ich konta (bo zapisaliśmy ich konto w DB jako nazwę ich zastępu). 
            // WAŻNE - FIXME: ten setup może generować duży problem z nadpisaniem danych w przypadku gdy nowy użytkownik/patrol wybierze jako swoją nazwę patrolu taką, jaka znajduje się już w firebase DB. Potencjalnym fixem tego jest operowanie na UID (Unique ID) które firebase przydziela nowym użytkownikom, lecz wtedy będzie trzeba znaleźć bardziej zoptymalizowany sposób fetchowania/indeksowania "node'ów" w bazie danych.      
            return firebase.database().ref(`accounts/${account.user.displayName}`).once('value')
              .then((dataSnapshot) => {
                let accountData = dataSnapshot.val();
                commit('saveAccountInStore', accountData);
                commit('changeLoadingState', false);
                return true;
              }).catch((err) => {
                console.log("Blad przy zapisie danych konta zastepu do vuexowego store'a");
                console.log(err);
                commit('changeLoadingState', false);
                return false;
              });
          })
          .catch(
            error => {
              console.log("Bląd podczas próby zalogowania!");
              console.log(error);
              commit('changeLoadingState', false);
              return false;
            }
          )
      }
    },
    sendPasswordResetEmail({
      commit
    }, email) {
      commit("changeLoadingState", true);
      firebase.auth().languageCode = "pl";
      return firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          commit("changeLoadingState", false);
          return true;
        })
        .catch(error => {
          console.log(error);
          commit("changeLoadingState", false);
          return false;
        });
    },
    logout({
      commit
    }) {
      firebase.auth().signOut()
      commit('logout')
    }
  }
})