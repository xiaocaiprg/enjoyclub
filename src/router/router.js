import Vue from "vue";
import Router from "vue-router";

import Home from "../views/home/index.vue";
import My from "../views/my/index.vue";
import Order from "../views/order/index.vue";
import Detail from "../views/home/buy-detail.vue";
Vue.use(Router);
const routes = [
  { path: "/", component: Home },
  { path: "/user-my", component: My },
  { path: "/user-order", component: Order },
  { path: "/user-detail", component: Detail },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes, // (缩写) 相当于 routes: rosutes
  mode: "history",
});

export default router;
