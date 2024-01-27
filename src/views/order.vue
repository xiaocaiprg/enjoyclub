<template>
  <div>
    <van-tabs v-model="orderIndex">
      <van-tab title="全部订单">
        <div v-if="orders && orders.length">
          <div v-for="(item, index) in orders" :key="index">
            <order-item :item="item"></order-item>
          </div>
        </div>
      </van-tab>
      <van-tab title="已购买">
        <div v-if="orders && orders.length">
          <div v-for="(item, index) in buyOrder" :key="index">
            <order-item :item="item"></order-item>
          </div>
        </div>
      </van-tab>
      <van-tab title="已消费">
        <div v-if="orders && orders.length">
          <div v-for="(item, index) in costedOrder" :key="index">
            <order-item :item="item"></order-item>
          </div>
        </div>
      </van-tab>
      <van-tab title="已退款"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mixins } from "../lib/mixin";
import OrderItem from "../components/order/order-item.vue";
import API from "@/api/order";
export default {
  name: "Order",
  components: {
    OrderItem,
  },
  mixins: [mixins],
  data() {
    return {
      orderIndex: 0,
      orders: [],
    };
  },
  computed: {
    buyOrder() {
      return this.orders.filter(item => item.orderStatus === 1);
    },
    costedOrder() {
      return this.orders.filter(item => item.orderStatus === 2);
    },
  },
  mounted() {
    this.getUserInfo().then(res => {
      this.isLogin = res ? true : false;
      if (res) {
        this.getOrder(res.userId);
      }
    });
  },
  methods: {
    getOrder(id) {
      const params = {
        userId: id,
        pageNum: 1,
        pageSize: 100,
      };
      API.getOrders(params).then(res => {
        this.orders = res && res.records;
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
