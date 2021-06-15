import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import Vuex from "vuex";
import { createStore } from "vuex";
import moment from "moment";
import DKToast from "vue-dk-toast";

const options = {
  color: "rgb(3, 252, 3)",
  failedColor: "rgb(247, 54, 74)",
  thickness: "5px",
};
const store = createStore({
  state: {
    tableData: [],
  },
  mutations: {
    // addData(state, payload) {
    //   state.tableData = state.tableData.push(payload);
    // },
  },
  actions: {
    // createDataRequested(context) {
    //   context.commit("addData");
    // },
  },
});

createApp(App)
  .use(store)
  .use(moment)
  .use(VueProgressBar, options)
  .use(router)
  .use(ElementPlus)
  .use(Vuex)
  .use(DKToast, {
    duration: 5000,
    positionY: "top", // 'top' or 'bottom'
    positionX: "right", // 'right' or 'left'
    styles: {
      color: "#000",
      backgroundColor: "#fff",
      width: "100px",
    },
  })
  .mount("#app");
