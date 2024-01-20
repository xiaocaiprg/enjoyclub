<template>
  <div>
    <van-tabs v-model="orderIndex">
      <van-tab title="全部订单">内容 1</van-tab>
      <van-tab title="已购买">内容 2</van-tab>
      <van-tab title="已消费">内容 3</van-tab>
      <van-tab title="已退款">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      orderIndex: 0,
    };
  },
};
</script>

<style lang="less"></style>
