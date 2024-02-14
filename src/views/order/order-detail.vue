<template>
  <div v-if="orderDetail" class="order-detail">
    <van-nav-bar
      title="订单详情"
      :left-text="'返回'"
      fixed
      :left-arrow="true"
      @click-left="onClickLeft"
    />
    <div class="order-item">
      <div class="order-status">
        订单状态：
        <div class="order-label">{{ orderLabel }}</div>
      </div>
    </div>
    <div class="order-item">
      <div class="order-info">
        <div class="item-box">
          <div style="width: 12rem">商品</div>
          <div>数量</div>
          <div>积分</div>
        </div>
        <van-divider dashed :style="{ borderColor: '#000', width: '100%' }">
        </van-divider>
        <div class="item-box">
          <div class="item-name">{{ orderDetail.productName }}</div>
          <div>{{ orderDetail.orderCount }}</div>
          <div>{{ orderDetail.integral }}</div>
        </div>
        <van-divider dashed :style="{ borderColor: '#3b3b3b', width: '100%' }">
        </van-divider>
        <div class="item-box tips">
          <div class="item-tip">
            <span>下单时间</span>
            <span> {{ orderDetail.createTime }}</span>
          </div>
          <div class="item-tip">
            <span>订单ID</span>
            <span> {{ orderDetail.orderId }}</span>
          </div>
          <!-- <div class="item-tip">
            <span>商家名称</span>
            <span> {{ orderDetail.merchantName }}</span>
          </div> -->
          <div class="item-tip">
            <span>下单备注</span>
            <span> {{ orderDetail.notes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/order";
import { mixins } from "../../lib/mixin";
import { OrderStatus } from "@/lib/config.ts";
export default {
  name: "OrderDetail",
  mixins: [mixins],
  data() {
    return {
      OrderStatus: OrderStatus,
      orderDetail: null,
    };
  },
  computed: {
    orderLabel() {
      return OrderStatus.find(
        item => item.value === this.orderDetail.orderStatus
      )?.label;
    },
  },
  created() {
    document.title = "订单详情";
    const { orderid } = this.$route.query;
    orderid && this.getOrderDetail(orderid);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getOrderDetail(orderid) {
      API.getSingleOrder(orderid).then(res => {
        this.orderDetail = res;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail {
  padding: 6rem 1rem 0;
}
.order-item {
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  margin-bottom: 1rem;
  padding: 1rem 3rem;
}
.order-status {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  height: 5rem;

  .order-label {
    font-size: 2rem;
    font-weight: 700;
  }
}
.order-info {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  .item-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: 500;
    width: 100%;
    .item-name {
      width: 14rem;
      white-space: wrap;
    }
    .item-tip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      color: #6d6d6d;
      margin-top: 1rem;
    }
  }
  .tips {
    flex-direction: column;
  }
}
</style>
