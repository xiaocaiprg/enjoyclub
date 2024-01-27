<template>
  <div class="top-header">
    <van-swipe class="carousel" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <img :src="item.url" alt="" class="pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      banner: [
        {
          url: "http://www.enjoyclub.shop/image/FB_Chrhdf6754over_31_6.jpg",
        },
        {
          url: " http://www.enjoyclub.shop/image/im654365436ages.jpg",
        },
        {
          url: "http://www.enjoyclub.shop/image/wKgBEFsGZwyAdZxCAAP2FbEBi6U68.jpeg",
        },
        {
          url: "http://www.enjoyclub.shop/image/car_1_1_4cd1174e27834539ad6bbf3e509e0e4a.jpg",
        },
        {
          url: "http://www.enjoyclub.shop/image/wKgBs1gz0Z2AD9c3AANPN8srUNM66.jpeg",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.top-header {
  .carousel {
    width: 100%;
    height: 20rem;
    .pic {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
