import { createApp } from "vue";
import dialogService from "@caroundsky/el-plus-dialog-service";
import App from "@/App.vue";
import "@/styles/index.scss";
import "virtual:windi.css";
import "reset-css";
import "uno.css";
import "element-plus/theme-chalk/src/index.scss";
import store from "@/store";
import router from "@/router";

const app = createApp(App);
app.config.globalProperties.$dialogService = dialogService;
app.use(store);
app.use(router);
app.mount("#app");
