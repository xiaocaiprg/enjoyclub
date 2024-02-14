<template>
  <div class="my-page">
    <div v-if="!isLogin" class="not-login">
      <h2>请登录/注册</h2>
      <div class="login-card">
        <van-field
          v-model="username"
          class="user-item"
          label-width="100px"
          label="请输入用户名"
          :colon="true"
          required
          clearable
          placeholder="用户名"
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
          placeholder="密码"
        />
      </div>
      <div class="user-btn">
        <van-button
          round
          type="info"
          color="#ff6633"
          style="flex: 1"
          @click="onSubmit"
        >
          登录
        </van-button>
        <van-button
          round
          type="info"
          color="#494453"
          style="flex: 1; margin-left: 1rem"
          @click="onClickRegister"
        >
          注册
        </van-button>
      </div>
      <van-overlay
        :show="showRegister"
        z-index="2"
        @click="showRegister = false"
      >
        <div class="register-card" @click.stop>
          <h2>注册新账号</h2>
          <van-form
            ref="registerForm"
            class="register-form"
            colon
            @submit="onRegister"
          >
            <van-field
              v-model="register.username"
              name="username"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="register.password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              v-model="register.inviteCode"
              name="inviteCode"
              label="邀请码"
              placeholder="邀请码"
              :rules="[{ required: true, message: '请填写邀请码' }]"
            />
            <van-field
              v-model="register.phone"
              name="phone"
              label="手机号"
              placeholder="请输入正确的手机号用于联系"
            />
            <van-loading v-if="btnDisable" class="loading" size="24px">
              注册中,请稍后...
            </van-loading>
            <div class="register-btn">
              <van-button
                round
                plain
                block
                type="info"
                color="#ff6633"
                @click="showRegister = false"
              >
                取消
              </van-button>
              <van-button
                round
                block
                type="info"
                color="#ff6633"
                :disabled="btnDisable"
                native-type="submit"
                style="margin-left: 1rem"
              >
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </van-overlay>
    </div>
    <div v-else class="has-login">
      <div class="my-account">
        <div style="display: flex; align-items: center">
          <img
            class="user-pic"
            src="http://www.enjoyclub.shop/image/47aab77b9fee4f7ca9e50410f325be5f.jpg"
            alt=""
          />
          <div class="user-wrapper">
            <div class="user-name">{{ userInfo.username }}</div>
            <div v-if="userInfo.phone" class="user-phone">
              手机号: {{ userInfo.phone }}
            </div>
          </div>
        </div>

        <div class="my-info">
          <div class="info-wrapper">
            <span> 我的积分：</span>
            <span class="intergral">{{ userInfo.integral }}</span>
          </div>
          <div class="info-wrapper">
            <span> 我的账户：</span>
            <div v-if="cardNum" style="display: flex; align-items: center">
              <span class="cardNum">{{ cardNum }}</span>
              <van-button
                plain
                hairline
                type="info"
                style="height: 2rem"
                color="#ff6633"
                @click="showBankNum = true"
              >
                更新
              </van-button>
            </div>
            <van-button
              v-else
              plain
              hairline
              type="info"
              style="height: 2rem"
              color="#ff6633"
              @click="showBankNum = true"
            >
              去绑定
            </van-button>
          </div>
        </div>
        <van-dialog
          v-model="showBankNum"
          title="绑定/更新 银行账户"
          show-cancel-button
          @confirm="onUpdateBankCard"
        >
          <van-notice-bar left-icon="volume-o" text="请输入准确的银行账户" />
          <van-cell-group>
            <van-field
              v-model="bankCardNum"
              label="输入卡号"
              placeholder="请输入"
            />
          </van-cell-group>
        </van-dialog>
      </div>
      <div class="common-functions">
        <h1 style="margin-bottom: 1rem">常用功能</h1>
        <div class="common-function-item">
          <van-icon name="location-o" />
          <span class="item-label">地址管理</span>
        </div>
        <van-divider style="margin: 0.5rem" />
        <div class="common-function-item">
          <van-icon name="setting-o"></van-icon>
          <span class="item-label">设置</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/my";

import { mixins } from "../../lib/mixin";
export default {
  name: "My",
  mixins: [mixins],
  data() {
    return {
      username: "",
      password: "",
      isLogin: false,
      userInfo: null,
      showRegister: false,
      btnDisable: false,
      register: {
        username: "",
        password: "",
        inviteCode: "",
        phone: "",
      },
      bankCardNum: "",
      showBankNum: false,
    };
  },
  computed: {
    cardNum() {
      return this.userInfo && this.userInfo.cardNum
        ? this.userInfo.cardNum.replace(
            /^(\d{4})\d+(\d{4})$/,
            "$1 **** **** $2"
          )
        : "";
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getUserInfo().then(res => {
        this.isLogin = res ? true : false;
        this.userInfo = res;
      });
    },
    onSubmit() {
      if (this.username === "" || this.password === "")
        return this.$toast("请先登录");
      API.login({ username: this.username, password: this.password }).then(
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
    onClickRegister() {
      this.showRegister = true;
    },
    onUpdateBankCard() {
      if (!this.bankCardNum) return;
      const params = {
        cardNum: this.bankCardNum,
      };
      API.updateAccount(params)
        .then(res => {
          if (res) {
            this.$toast.success("更新成功");
            this.showBankNum = false;
            this.init();
          }
        })
        .catch(err => {
          this.$toast.fail(`操作失败: ${err.msg}`);
        });
    },
    onRegister() {
      this.btnDisable = true;
      API.register(this.register)
        .then(res => {
          if (res) {
            this.$toast.success("注册成功");
            this.userInfo = res;
            this.btnDisable = true;
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          }
        })
        .catch(err => {
          this.$toast.fail(`注册失败: ${err.msg}`);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.not-login {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  .login-card {
    width: 30rem;
    margin: 2rem 0;
    border-radius: 20%;

    .user-item {
      background: #fbfbfb;
    }
  }
  .user-btn {
    display: flex;
    justify-content: space-between;
  }

  .register-card {
    background: #fff;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: 20rem 2rem 2rem;
    z-index: 3;
    .register-form {
      margin: 1rem 0;
      width: 100%;
    }
    .loading {
      display: flex;
      margin-top: 1rem;
      justify-content: center;
    }
    .register-btn {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
  }
}

.has-login {
  .my-account {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 20rem;
    background-image: url("../../assets/bg.jpeg");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 4rem 2rem 1rem;
    .user-pic {
      height: 6rem;
      border-radius: 50%;
      width: 6rem;
      margin-right: 1rem;
    }
    .user-wrapper {
      display: flex;
      flex-direction: column;
      color: #fff;
      .user-name {
        font-family: "PingFangSC-Semibold";
        font-size: 1.5rem;
        margin-bottom: 0.2rem;
      }
    }
    .my-info {
      font-size: 1.5rem;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 10rem;
      padding: 0 2rem;
      font-weight: 600;
      background-color: #fbfbfb;

      margin-top: 0.5rem;
      .info-wrapper {
        display: flex;
        align-items: center;
        .cardNum {
          margin-right: 0.2rem;
        }
      }
    }
  }
  .common-functions {
    padding: 1rem;
    margin: 1rem 2rem;
    background-color: #fbfbfb;
    border-radius: 1rem;
    .common-function-item {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      height: 3rem;
      .item-label {
        font-weight: 600;
        margin-left: 0.4rem;
      }
    }
  }
}
</style>
