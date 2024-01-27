import { get } from "../api/index";
const PATH = {
  GET_USER_INFO: "haiyang/user/token",
};
export const mixins = {
  mounted() {},
  methods: {
    getCookie(name) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    },

    getUserInfo() {
      const token = this.getCookie("token") || "";
      if (token) {
        return get(`${PATH.GET_USER_INFO}/${token}`)
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
        this.$route.path !== "/my" && this.$router.push("/my");
      }
      console.log(err, "handleErr");
    },
  },
};
