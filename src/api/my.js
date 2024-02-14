import http from "./index";

const PATH = {
  LOGIN: "haiyang/user/login",
  REGISTER: "haiyang/user/register",
  BANK: "haiyang/user/updateCardNum",
};
const API = {
  login(params) {
    return http
      .loginPost(PATH.LOGIN, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        throw err;
      });
  },
  register(params) {
    return http
      .loginPost(PATH.REGISTER, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
        throw res;
      })
      .catch(err => {
        throw err;
      });
  },
  updateAccount(params) {
    return http
      .put(PATH.BANK, params)
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
