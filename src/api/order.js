import { get } from "./index";

const PATH = {
  GET_ORDERS: "/haiyang/order",
};
const API = {
  getOrders(params) {
    return get(PATH.GET_ORDERS, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        throw err;
      });
  },
};
export default API;
