<template>
  <div class="tab-wrapper">
    <div class="tab">
      <div
        v-for="(item, index) in category"
        :key="index"
        class="tab-item"
        @click="onChangeTab(item, index)"
      >
        <img class="icon" :src="item.icon" alt="" />
        <div class="text">{{ item.categoryName }}</div>
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
        {{ sub.subcategoryName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBanner",
  props: {
    category: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      curIndex: 0,
      curSecIndex: 0,
      categoryIds: {
        categoryId: 1,
        subcategoryId: 1,
      },
    };
  },
  computed: {
    subTabs() {
      return this.category[this.curIndex].subcategorys;
    },
  },
  methods: {
    onChangeTab(item, index) {
      this.curIndex = index;
      this.curSecIndex = 0;
      this.categoryIds.categoryId = item.categoryId;
      this.categoryIds.subcategoryId = this.subTabs[0].subcategoryId;
      this.$emit("changeTab", this.categoryIds);
    },
    onclickSub(item, key) {
      this.curSecIndex = key;
      this.categoryIds.subcategoryId = item.subcategoryId;
      this.$emit("changeTab", this.categoryIds);
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
