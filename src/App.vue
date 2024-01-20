<template>
  <div id="app">
    <router-view />
    <van-tabbar
      v-model="activeTab"
      active-color="#ff6200"
      inactive-color="#000"
      @change="onChange"
    >
      <van-tabbar-item icon="home-o"> 首页 </van-tabbar-item>
      <van-tabbar-item icon="notes-o"> 订单 </van-tabbar-item>
      <van-tabbar-item icon="manager-o"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mixins } from "./lib/mixin";
export default {
  name: "App",
  mixins: [mixins],
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
    showTabbar() {
      return ["/", "/order", "/my"].includes(this.$route.path);
    },
  },
  mounted() {},
  methods: {
    onChange(index) {
      switch (index) {
        case 1:
          this.$route.path !== "/order" && this.$router.push("/order");
          break;
        case 2:
          this.$route.path !== "/my" && this.$router.push("/my");
          break;
        case 0:
          this.$route.path !== "/" && this.$router.push("/");
          break;
      }
    },
  },
};
</script>

<style lang="less"></style>
