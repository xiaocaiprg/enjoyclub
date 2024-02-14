<template>
  <div>
    <top-header />
    <tab-banner
      v-if="category && category.length"
      :category="category"
      @changeTab="changeTab"
    />
    <filter-list
      v-if="productList && productList.length"
      :product-list="productList"
    />
  </div>
</template>

<script>
import TopHeader from "./components/top-header.vue";
import TabBanner from "./components/tab.vue";
import FilterList from "./components/list.vue";
import API from "@/api/home.js";
import { mixins } from "../../lib/mixin";

export default {
  name: "Home",
  components: {
    TopHeader,
    TabBanner,
    FilterList,
  },
  mixins: [mixins],
  data() {
    return {
      productList: [],
      category: [],
      catePic: [
        "http://www.enjoyclub.shop/image/2730361-inkcontober-mountain-mountain-sunrise-trail-icon.png",
        "http://www.enjoyclub.shop/image/4082091-healthcare-hospital-medical-icon.png",
        "http://www.enjoyclub.shop/image/6843035-exchange-goods-investment-money-product-icon.png",
      ],
      categoryIds: {
        categoryId: 1,
        subcategoryId: 1,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getCategory();
      this.getProduct();
    },
    getProduct() {
      const params = {
        categoryId: this.categoryIds.categoryId,
        subcategoryId: this.categoryIds.subcategoryId,
        pageNum: 1,
        pageSize: 100,
      };
      API.getProduct(params)
        .then(res => {
          this.productList = (res && res.records) || [];
        })
        .catch(err => {
          this.handleErr(err);
        });
    },
    getCategory() {
      const params = {
        pageNum: 1,
        pageSize: 100,
      };
      API.getCategory(params)
        .then(res => {
          this.category = (res || []).map((item, index) => {
            return {
              ...item,
              icon: this.catePic[index],
            };
          });
          this.categoryId = this.category[0].categoryId;
          this.subcategoryId = this.category[0].subcategorys[0].subcategoryId;
        })
        .catch(err => {
          this.handleErr(err);
        });
    },
    changeTab(item) {
      this.categoryIds = item;
      this.productList = [];
      this.getProduct();
    },
  },
};
</script>

<style></style>
