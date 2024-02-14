import http from "../api/index";
const PATH = {
  GET_USER_INFO: "haiyang/user/token",
};
export const mixins = {
  mounted() {},
  methods: {
    getLocalStorage() {
      const authorization = window.localStorage.getItem("authorization");
      return authorization;
    },
    setLocalStorage(value) {
      window.localStorage.setItem("authorization", value);
    },
    getUserInfo() {
      const authorization = this.getLocalStorage() || "";
      if (authorization) {
        return http
          .get(`${PATH.GET_USER_INFO}`)
          .then(res => {
            if (res.code === 200) {
              return res.result;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return Promise.resolve("");
      }
    },
    handleErr(err) {
      if (err.response && err.response.status === 406) {
        this.$route.path !== "/user-my" && this.$router.push("/user-my");
      }
      console.log(err, "handleErr");
    },
  },
};
