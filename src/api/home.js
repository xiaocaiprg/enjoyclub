import { get, post } from "./index";

const PATH = {
  LOGIN: "haiyang/product",
};
const API = {
  login(params) {
    return post(PATH.LOGIN, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
};
export default API;
