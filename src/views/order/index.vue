<template>
  <div>
    <van-tabs v-model="orderValue" sticky>
      <van-tab
        v-for="(tab, index) in orderTab"
        :key="index"
        :title="tab.label"
        :name="tab.value"
      >
        <div v-if="ordersData && ordersData.length" class="card-content">
          <van-card
            v-for="(item, idx) in orderFilterData"
            :key="idx"
            class="order-card"
            num="1"
            :tag="tagLabel(item)"
            :desc="item.descrip"
            :title="item.productName"
            :thumb="item.pic"
          >
            <template #price>
              <div class="price">{{ item.integral }} 积分</div>
            </template>
            <template #tags>
              <van-tag
                v-for="(tag, index) in item.labels.split(',')"
                :key="index"
                plain
                color="#fed1ce"
                text-color="#ff4a4a"
                class="tag"
              >
                {{ tag }}
              </van-tag>
            </template>
            <template #footer>
              <van-button
                v-if="item.orderStatus === OrderStatusEnum.HASPAYED"
                size="mini"
                color="#ff6633"
                @click="onConfirm(item)"
              >
                确认收货
              </van-button>
              <van-button size="mini" @click="onCheck"> 查看 </van-button>
            </template>
          </van-card>
        </div>
      </van-tab>
    </van-tabs>
    <van-dialog
      v-model="showConfirm"
      title="确认已收到商品？"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-notice-bar
        style="margin: 1rem"
        wrapable
        color="#ff0000"
        background="#fff"
        :scrollable="false"
        text="请确保成功收货再确认,此操作不可撤销,请谨慎操作"
      />
    </van-dialog>
  </div>
</template>

<script>
import { mixins } from "@/lib/mixin";
import API from "@/api/order";
import { Dialog } from "vant";
import { OrderStatus, OrderStatusEnum } from "@/lib/config.ts";
export default {
  name: "Order",
  components: {},
  mixins: [mixins],
  data() {
    return {
      orderValue: "0",
      ordersData: [],
      orderTab: [
        {
          label: "全部订单",
          value: "all",
        },
        {
          label: "待收货/收款",
          value: "pendding",
        },
        {
          label: "已完成",
          value: "finsh",
        },
        {
          label: "已取消",
          value: "cancel",
        },
      ],
      OrderStatus: OrderStatus,
      OrderStatusEnum: OrderStatusEnum,
      showConfirm: false,
      currentOrder: null,
      userInfo: null,
    };
  },
  computed: {
    orderFilterData() {
      if (this.orderValue === "pendding") {
        return this.ordersData.filter(
          item =>
            item.orderStatus === OrderStatusEnum.CONFIRM ||
            item.orderStatus === OrderStatusEnum.HASPAYED
        );
      }
      if (this.orderValue === "finsh") {
        return this.ordersData.filter(
          item => item.orderStatus === OrderStatusEnum.DONE
        );
      }
      if (this.orderValue === "cancel") {
        return this.ordersData.filter(
          item => item.orderStatus === OrderStatusEnum.CANCEL
        );
      }
      return this.ordersData;
    },
  },
  mounted() {
    this.getUserInfo().then(res => {
      this.isLogin = res ? true : false;
      this.userInfo = res;
      this.getOrders();
    });
  },
  methods: {
    getOrders() {
      if (!this.userInfo) return;
      const params = {
        userId: this.userInfo.userId,
        pageNum: 1,
        pageSize: 100,
      };
      API.getOrders(params).then(res => {
        this.ordersData = res && res.records;
      });
    },
    tagLabel(order) {
      return OrderStatus.find(item => item.value === order.orderStatus)?.label;
    },
    onCheck() {},
    onConfirm(item) {
      this.showConfirm = true;
      this.currentOrder = item;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        API.userConfirm({ orderId: this.currentOrder.orderId }).then(res => {
          if (res) {
            this.$toast.success("确认收货成功");
            this.getOrders();
            done();
          } else {
            this.$toast.fail("收货失败，请重试");
            done(false);
          }
        });
      } else {
        done();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.card-content {
  padding-bottom: 50px;
}
.order-card {
  margin-top: 1rem;
  .price {
    font-size: 1.3rem;
    color: #111;
    font-weight: 700;
  }
  .tag {
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
}
</style>
