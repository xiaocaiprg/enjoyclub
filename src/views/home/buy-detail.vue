<template>
  <div v-if="product" class="product">
    <div
      class="bg"
      :style="{
        backgroundImage: `url(${product.pics})`,
      }"
    >
      <van-nav-bar
        title="商品详情"
        :left-text="'返回'"
        fixed
        :left-arrow="true"
        @click-left="onClickLeft"
      />
    </div>
    <div class="product-detail">
      <div class="title">{{ product.productName }}</div>
      <div class="desc">{{ product.descrip }}</div>
      <div class="price">{{ `${product.integral}积分` }}</div>
      <div class="line"></div>
      <div class="label">
        <div v-for="(tag, index) in labels" :key="index" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
    <div class="buy-btn" @click="onBuy">立即下单</div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { mixins } from "../../lib/mixin";
import API from "@/api/home";
export default {
  name: "BuyDetail",
  mixins: [mixins],
  data() {
    return {
      product: {},
    };
  },
  computed: {
    labels() {
      return (this.product.labels && this.product.labels.split(",")) || [];
    },
  },
  mounted() {
    const { productid } = this.$route.query;
    productid && this.getProductDetail(productid);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getProductDetail(id) {
      API.getProductDetail(id).then(res => {
        this.product = res;
      });
    },
    buyProduct() {
      this.getUserInfo().then(res => {
        if (res) {
          const params = {
            userId: res.userId,
            productId: this.product.productId,
            orderCount: 1,
          };
          API.buyProduct(params).then(res => {
            res && Toast.success("下单成功");
            setTimeout(() => {
              this.$router.push("/user-order");
            }, 1000);
          });
        }
      });
    },
    onBuy() {
      Dialog.confirm({
        title: "确认下单?",
        message: `需要消耗${this.product.integral}积分`,
      })
        .then(() => {
          this.buyProduct();
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.bg {
  background-size: cover;
  background-repeat: no-repeat;
  height: 25rem;
  width: 100%;
}

.product-detail {
  margin-top: -2rem;
  background-color: #fff;
  border-radius: 2rem 2rem 0 0;
  padding: 2rem;
  .title {
    font-size: 3rem;
    font-family: "PingFangSC-Semibold";
  }
  .desc {
    font-size: 1.5rem;
    font-family: "PingFangSC-Regular";
  }
  .price {
    font-family: "PingFangSC-Semibold";
    font-size: 2rem;
    margin-top: 1rem;
    color: #ff6633;
  }
  .line {
    height: 1px;
    margin: 1rem 0;
    width: 100%;
    background-color: #dadada;
  }
  .label {
    display: flex;
    .tag {
      background: #fff5f4;
      border: 1px solid #fed1ce;
      border-radius: 2px;
      margin-right: 0.4rem;
      padding: 2px 4px;
      color: #ff4a4a;
    }
  }
}
.buy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20rem;
  color: #fff;
  font-family: "PingFangSC-Semibold";
  font-size: 1.5rem;
  right: 2rem;
  border-radius: 2rem;
  background: #ff6633;
  padding: 0 1rem;
  height: 5rem;
}
</style>
