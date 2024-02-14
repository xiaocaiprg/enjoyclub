<template>
  <div v-if="product" class="product">
    <div
      class="bg"
      :style="{
        backgroundImage: `url(${topPic})`,
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
      <div class="price">{{ `${product.integral}积分` }}</div>
      <div class="title">{{ product.productName }}</div>
      <div class="desc">{{ product.descrip }}</div>
      <div class="label">
        <van-tag
          v-for="(tag, index) in labels"
          :key="index"
          plain
          color="#fed1ce"
          text-color="#ff4a4a"
          class="tag"
        >
          {{ tag }}
        </van-tag>
      </div>
      <van-divider>推荐商品</van-divider>
      <van-tabs v-model="productValue" sticky>
        <van-tab
          v-for="(tab, index) in productTab"
          :key="index"
          :title="tab.label"
          :name="tab.value"
        >
          <div class="tab-content">
            <!-- <div class="tab-title">{{ tab.label }}</div> -->
            <div></div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="buy-btn" @click="onBuy">立即下单</div>
    <van-dialog
      v-model="showBuy"
      title="确认下单?"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-notice-bar
        style="margin: 1rem"
        wrapable
        color="#ff0000"
        background="#fff"
        :scrollable="false"
        :text="`需要消耗${product.integral}积分`"
      />
      <van-cell-group>
        <van-field
          v-model="notes"
          label-width="3.5rem"
          label="备注"
          placeholder="可输入备注，便于下单后联系"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { mixins } from "../../lib/mixin";
import API from "@/api/home";
export default {
  name: "BuyDetail",
  mixins: [mixins],
  data() {
    return {
      product: {},
      showBuy: false,
      notes: "",
      productValue: "detail",
      productTab: [
        {
          label: "商品包含",
          value: "detail",
        },
        {
          label: "购买须知",
          value: "buyRule",
        },
        {
          label: "图文描述",
          value: "productPic",
        },
      ],
    };
  },
  computed: {
    labels() {
      return (this.product.labels && this.product.labels.split(",")) || [];
    },
    topPic() {
      return this.product.pics && this.product.pics.split(",")[0];
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

    onBuy() {
      this.showBuy = true;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        this.getUserInfo().then(res => {
          if (res) {
            const params = {
              userId: res.userId,
              productId: this.product.productId,
              orderCount: 1,
              notes: this.notes,
            };
            API.buyProduct(params)
              .then(res => {
                if (res) {
                  this.$toast.success("下单成功");
                  setTimeout(() => {
                    this.$router.push("/user-order");
                  }, 1000);
                  done();
                } else {
                  this.$toast.fail("下单失败，请重试");
                  done(false);
                }
              })
              .catch(err => {
                this.$toast.fail("下单失败，请重试");
              });
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
  padding: 1.5rem;
  .title {
    margin-top: 0.5rem;
    font-size: 2rem;
    font-family: "PingFangSC-Semibold";
  }
  .desc {
    margin-top: 0.5rem;
    font-size: 1.3rem;
    font-family: "PingFangSC-Regular";
  }
  .price {
    font-family: "PingFangSC-Semibold";
    font-size: 2.5rem;
    color: #ff6633;
  }

  .label {
    display: flex;
    margin-top: 0.2rem;
    .tag {
      margin: 0.5rem 0.5rem 0.5rem 0;
    }
  }
  .tab-content {
    display: flex;
    flex-direction: column;
    .tab-title {
      font-size: 1.5rem;
      text-align: center;
      color: #b7b7b7;
      margin-top: 1rem;
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
  border-radius: 1rem;
  background: #ff6633;
  padding: 0 1rem;
  height: 5rem;
}
.notes {
  padding: 1rem;
}
</style>
