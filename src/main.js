import Vue from "vue";
import App from "./App";
import router from "./router/index";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import PaperDashboard from "./plugins/paperDashboard";

Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
//.$mount("#app");
