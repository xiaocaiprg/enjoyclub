import http from "./index";

const PATH = {
  GET_ORDERS: "haiyang/order",
  USER_CONFIRM: "haiyang/order/userconfirm",
};
const API = {
  getOrders(params) {
    return http
      .get(PATH.GET_ORDERS, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        throw err;
      });
  },
  userConfirm(params) {
    return http
      .post(PATH.USER_CONFIRM, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
        throw res;
      })
      .catch(err => {
        throw err;
      });
  },
};
export default API;
