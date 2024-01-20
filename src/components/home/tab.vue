<template>
  <div class="tab-wrapper">
    <div class="tab">
      <div
        class="tab-item"
        v-for="(item, index) in tabs"
        :key="index"
        @click="onChangeTab(item, index)"
      >
        <img class="icon" :src="item.icon" alt="" />
        <div class="text">{{ item.text }}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="sub-tab">
      <div
        v-for="(sub, key) in subTabs"
        :key="key"
        class="sub-item"
        :class="{ active: curSecIndex === key }"
        @click="onclickSub(sub, key)"
      >
        {{ sub.subtext }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBanner",
  data() {
    return {
      tabs: [
        {
          icon: "https://i.postimg.cc/Bby73RLN/2730361-inkcontober-mountain-mountain-sunrise-trail-icon.png",
          text: "旅游定制",
          subTab: [
            {
              subtext: "大陆",
            },
            {
              subtext: "香港",
            },
            {
              subtext: "美国",
            },
            {
              subtext: "大陆",
            },
            {
              subtext: "香港",
            },
            {
              subtext: "美国",
            },
            {
              subtext: "大陆",
            },
            {
              subtext: "香港",
            },
            {
              subtext: "美国",
            },
          ],
        },
        {
          icon: "https://i.postimg.cc/SRDzpBg5/4082091-healthcare-hospital-medical-icon.png",
          text: "健康咨询",
          subTab: [
            {
              subtext: "骨科",
            },
            {
              subtext: "呼吸科",
            },
            {
              subtext: "外科",
            },
          ],
        },
        {
          icon: "https://i.postimg.cc/c4zrMM2Q/6843035-exchange-goods-investment-money-product-icon.png",
          text: "甄选好物",
          subTab: [
            {
              subtext: "百货",
            },
            {
              subtext: "运动",
            },
            {
              subtext: "饰品",
            },
          ],
        },
      ],
      curIndex: 0,
      curSecIndex: 0,
    };
  },
  computed: {
    subTabs() {
      return this.tabs[this.curIndex].subTab;
    },
  },
  methods: {
    onChangeTab(item, index) {
      this.curIndex = index;
      this.curSecIndex = 0;
    },
    onclickSub(item, key) {
      this.curSecIndex = key;
    },
  },
};
</script>

<style lang="less" scoped>
.tab-wrapper {
  padding: 0 3rem;
}
.tab {
  display: flex;
  overflow-x: scroll;
  justify-content: space-between;
  margin-top: 1rem;
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      height: 4rem;
      width: 4rem;
    }
    .text {
      font-size: 1.5rem;
    }
  }
}
.line {
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  background-color: #f6f6f6;
}
.sub-tab {
  display: flex;
  overflow-x: scroll;
  .sub-item {
    border-radius: 1rem;
    padding: 0.4rem 1.3rem;
    color: #111;
    background: #f6f6f6;
    white-space: nowrap;
    margin-right: 1rem;
    font-size: 1.3rem;
    &.active {
      color: #ff6633;
      background: #ffefea;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
