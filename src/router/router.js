import Vue from "vue";
import Router from "vue-router";

import Home from "../views/home.vue";
import My from "../views/my.vue";
import Order from "../views/order.vue";
import Detail from "../views/buy-detail.vue";
Vue.use(Router);
const routes = [
  { path: "/", component: Home },
  { path: "/my", component: My },
  { path: "/order", component: Order },
  { path: "/detail", component: Detail },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes, // (缩写) 相当于 routes: rosutes
  mode: "history",
});

export default router;
