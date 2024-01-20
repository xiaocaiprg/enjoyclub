<template>
  <div class="product">
    <div
      class="bg"
      :style="{
        backgroundImage: `url(${product.pic})`,
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
      <div class="title">{{ product.title }}</div>
      <div class="desc">{{ product.desc }}</div>
      <div class="price">{{ `${product.price}积分` }}</div>
      <div class="line"></div>
      <div class="label">
        <div v-for="(tag, index) in product.tags" :key="index" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
    <div class="buy-btn" @click="onBuy">立即下单</div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
export default {
  name: "BuyDetail",
  data() {
    return {
      product: {
        pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1mBWwe96HjVxNTPD96n2RlAjzSPhRJ_ZILspeUZClFUcd0wjP6-Vlyqu_6cCAZ0tVo8&usqp=CAU",
        title: "商品标题商品标题",
        desc: "商品简介简介简介简介简介简介简介简介简介简介简介商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        price: 99,
        tags: ["高端定制", "深度体验"],
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onBuy() {
      Dialog.confirm({
        title: "确认下单?",
        message: `需要消耗${this.product.price}积分`,
      })
        .then(() => {
          Toast.success("下单成功");
          setTimeout(() => {
            this.$router.push("/order");
          }, 1000);
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
