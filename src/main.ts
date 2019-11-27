import Vue from "vue";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

import config from "./config";
import App from "./App.vue";
import router from "./router";
import store from "./store";

firebase.initializeApp(config.firebaseConfig);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
