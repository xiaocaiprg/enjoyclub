import http from "./index";

const PATH = {
  GET_PRODUCT: "haiyang/product",
  BUY: "haiyang/order/buy",
  GET_CATEGORY: "haiyang/category/tree",
};
const API = {
  getProduct(params) {
    return http
      .get(PATH.GET_PRODUCT, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        throw err;
      });
  },
  getProductDetail(id) {
    return http
      .get(`${PATH.GET_PRODUCT}/${id}`)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        throw err;
      });
  },
  getCategory(params) {
    return http
      .get(PATH.GET_CATEGORY, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        throw err;
      });
  },
  buyProduct(params) {
    return http
      .post(PATH.BUY, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        throw err;
      });
  },
};
export default API;
