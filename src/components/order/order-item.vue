<template>
  <div class="all">
    <div class="title">
      <div class="order-name">{{ item.productName }}</div>
      <div class="order-text">
        {{ statusText(item.orderStatus) }}
      </div>
    </div>
    <div class="order-price">积分: {{ item.price }}</div>
  </div>
</template>

<script>
export default {
  name: "OrderItem",
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    statusText(stauts) {
      return stauts == 1 ? "已购买" : "已消费";
    },
  },
};
</script>

<style lang="less" scoped>
.all {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1rem;
  .order-name {
    font-size: 1.5rem;
  }
  .order-text {
    font-size: 1rem;
    color: #6b6b66;
  }
}
.order-price {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #ff6633;
}
</style>
