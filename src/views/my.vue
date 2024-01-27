<template>
  <div>
    <div v-if="!isLogin" class="my">
      <h2>请登录</h2>
      <div class="login-card">
        <van-field
          v-model="username"
          class="user-item"
          label-width="100px"
          label="请输入用户名"
          :colon="true"
          required
          clearable
          placeholder="username"
        />
        <van-field
          v-model="password"
          class="user-item"
          label-width="100px"
          type="password"
          :colon="true"
          required
          clearable
          label="请输入密码"
          placeholder="password"
        />
      </div>
      <van-button
        round
        type="info"
        color="#494453"
        class="submit"
        @click="onSubmit"
      >
        登录
      </van-button>
    </div>
    <div v-else class="my">
      <div class="has-login">
        <img
          class="user-pic"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQsx_4JDuatMkr6t7daPzot_cetmDrsCap_Q&usqp=CAU"
          alt=""
        />
        <div class="user-name">{{ userInfo.userName }}</div>
      </div>
      <div class="my-intergral">
        我的积分：<span class="intergral">{{ userInfo.integral }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api/my";
import { mixins } from "../lib/mixin";
export default {
  name: "My",
  mixins: [mixins],
  data() {
    return {
      username: "",
      password: "",
      isLogin: false,
      userInfo: null,
    };
  },
  mounted() {
    this.getUserInfo().then(res => {
      this.isLogin = res ? true : false;
      this.userInfo = res;
    });
  },
  methods: {
    onSubmit() {
      if (this.username === "" || this.password === "")
        return this.$toast("请先登录");
      API.login({ userName: this.username, passWord: this.password }).then(
        res => {
          if (res) {
            this.$toast.success("登录成功");
            this.$router.push("/");
          } else {
            this.$toast.fail("登录失败");
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.my {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  margin-top: 4rem;
}
.login-card {
  width: 30rem;
  margin: 2rem 0;
  border-radius: 20%;

  .user-item {
    background: #fbfbfb;
  }
}
.has-login {
  display: flex;
  align-items: center;
  width: 100%;
  .user-pic {
    height: 6rem;
    width: 6rem;
  }
  .user-name {
    font-family: "PingFangSC-Semibold";
    font-size: 1.5rem;
  }
}
.my-intergral {
  font-size: 1.5rem;
  margin-top: 2rem;
  .intergral {
    color: #ff6633;
  }
}
.van-button {
  width: 20rem;
}
</style>
