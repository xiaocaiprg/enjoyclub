<template>
  <van-list
    v-model="loading"
    class="filter-list"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      v-for="(item, index) in productList"
      :key="index"
      class="card"
      @click="onCardClick(item)"
    >
      <img :src="item.pics" class="card-pic" alt="" />
      <div class="card-right">
        <div class="top">
          <div class="title">{{ item.productName }}</div>
          <div class="desc">{{ item.descrip }}</div>
        </div>
        <div class="label">
          <div
            v-for="(tag, index) in item.lables.split(',')"
            :key="index"
            class="tag"
          >
            {{ tag }}
          </div>
        </div>

        <div class="bottom">
          <div class="price">{{ `${item.integral}积分` }}</div>
          <div class="btn">购买</div>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
export default {
  name: "FilterList",
  props: {
    productList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      finished: true,
    };
  },
  computed: {},

  methods: {
    onLoad() {},
    onCardClick(item) {
      this.$router.push({
        path: "/detail",
        query: { productid: item.productId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.filter-list {
  padding: 0 1.5rem 50px;
  margin-top: 2rem;
}
.card {
  display: flex;
  margin-bottom: 2rem;
  border-radius: 2rem;
  .card-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;
    flex: 1;
    overflow: hidden;
    .title {
      font-family: "PingFangSC-Semibold";
      font-size: 1.8rem;
      color: #222;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .desc {
      font-family: "PingFangSC-Regular";
      font-size: 1.2rem;
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
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        font-family: "PingFangSC-Semibold";
        font-size: 1.4rem;
        color: #ff6633;
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ff6200;
        border-radius: 2rem;
        color: #fff;
        font-family: "PingFangSC-Semibold";
        font-size: 1.5rem;
        height: 3rem;
        width: 6rem;
      }
    }
  }
  .card-pic {
    border-radius: 2rem;
    height: 12rem;
    width: 12rem;
  }
}
</style>
