import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.css";
import { setupDemoData } from "./setupDemo.js";

// Setup demo data on app start
setupDemoData();

createApp(App).use(router).mount("#app");
