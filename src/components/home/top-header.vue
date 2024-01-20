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
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2m74jy9o9uUcH34PnU8nc0AaVnvlldeB1_A&usqp=CAU",
        },
        {
          url: "https://www.luxetravel.com.hk/Images/Homepage/FB_Cover_31_6.jpg",
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
