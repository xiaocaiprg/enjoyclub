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
      <img :src="getPic(item)" class="card-pic" alt="" />
      <div class="card-right">
        <div class="top">
          <div class="title">{{ item.productName }}</div>
          <div class="desc">{{ item.descrip }}</div>
        </div>
        <div v-if="item.labels" class="label">
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
    getPic(item) {
      return item.pics && item.pics.split(",")[0];
    },
    onLoad() {},
    onCardClick(item) {
      this.$router.push({
        path: "/user-detail",
        query: { productid: item.productId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.filter-list {
  padding: 0 0.5rem 50px;
  margin-top: 1rem;
}
.card {
  display: flex;
  margin-bottom: 2rem;
  border-radius: 2rem;
  padding: 0 1rem;

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
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .desc {
      font-family: "PingFangSC-Regular";
      font-size: 1.2rem;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .label {
      display: flex;
      margin-top: 0.2rem;
      .tag {
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
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
