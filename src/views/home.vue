<template>
  <div>
    <top-header />
    <tab-banner />
    <filter-list />
  </div>
</template>

<script>
import TopHeader from "../components/home/top-header.vue";
import TabBanner from "../components/home/tab.vue";
import FilterList from "../components/home/list.vue";
export default {
  name: "Home",
  components: {
    TopHeader,
    TabBanner,
    FilterList,
  },
};
</script>

<style></style>
