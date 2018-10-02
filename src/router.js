import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from './views/Home.vue'

// Nowe route'y można dodawać na parę różnych sposobów. Najprostszym jest taki, że importujesz powyżej dany component (patrz: tak jak jest tu zimportowany Home) i później po prostu dodajesz go do arrayki routów, drugi to tak, jak zrobione jest dla route'u "about".   

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta:{
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
    }
  ]
})

// Tutaj jest nasz route-guard w najprostszej postaci - każdy route, który jest dostępny tylko dla zalogowanych ma property "meta: requiresAuth". Poniższa funkcja dziala jak typowy Node'owy middleware i przed każdą zmianą route sprawdza stan zalogowania usera i czy nowy route wymaga zalogowania.
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // TODO: update the below !
  if (requiresAuth && !currentUser) next('login') // Jeśli user nie jest zalogowany a route tego wymaga, przenosimy go do panelu logowania
  else next() // w każdym innym wypadku po prostu kontynuuj pracę vue-routera.
})

 
export default router