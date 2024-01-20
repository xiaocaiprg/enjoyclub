<template>
  <van-list
    v-model="loading"
    class="filter-list"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      class="card"
      @click="onCardClick"
    >
      <img :src="item.pic" class="card-pic" alt="" />
      <div class="card-right">
        <div class="top">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <div class="label">
          <div v-for="(tag, index) in item.tags" :key="index" class="tag">
            {{ tag }}
          </div>
        </div>

        <div class="bottom">
          <div class="price">{{ `${item.price}积分` }}</div>
          <div class="btn">购买</div>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
export default {
  name: "FilterList",
  data() {
    return {
      list: [
        {
          pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1mBWwe96HjVxNTPD96n2RlAjzSPhRJ_ZILspeUZClFUcd0wjP6-Vlyqu_6cCAZ0tVo8&usqp=CAU",
          title: "商品标题商品标题",
          desc: "商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
          price: 99,
          tags: ["高端定制", "深度体验"],
        },
        {
          pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1mBWwe96HjVxNTPD96n2RlAjzSPhRJ_ZILspeUZClFUcd0wjP6-Vlyqu_6cCAZ0tVo8&usqp=CAU",
          title: "商品标题商品标题",
          desc: "商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
          price: 99,
          tags: ["高端定制", "深度体验"],
        },
        {
          pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1mBWwe96HjVxNTPD96n2RlAjzSPhRJ_ZILspeUZClFUcd0wjP6-Vlyqu_6cCAZ0tVo8&usqp=CAU",
          title: "商品标题商品标题",
          desc: "商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
          price: 99,
          tags: ["高端定制", "深度体验"],
        },
        {
          pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1mBWwe96HjVxNTPD96n2RlAjzSPhRJ_ZILspeUZClFUcd0wjP6-Vlyqu_6cCAZ0tVo8&usqp=CAU",
          title: "商品标题商品标题",
          desc: "商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
          price: 99,
          tags: ["高端定制", "深度体验"],
        },
        {
          pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1mBWwe96HjVxNTPD96n2RlAjzSPhRJ_ZILspeUZClFUcd0wjP6-Vlyqu_6cCAZ0tVo8&usqp=CAU",
          title: "商品标题商品标题",
          desc: "商品简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
          price: 99,
          tags: ["高端定制", "深度体验"],
        },
      ],
      loading: false,
      finished: true,
    };
  },
  methods: {
    onLoad() {},
    onCardClick() {
      this.$router.push("/detail");
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
    .title {
      font-family: "PingFangSC-Semibold";
      font-size: 1.8rem;
      color: #222;
      display: -webkit-box;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
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
