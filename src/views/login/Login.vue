<!--
 * @Description: 登录页面
 * @Author: 王振
 * @Date: 2021-06-25 12:47:13
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:52:24
-->
<template>
  <div class="login">
    <!-- 返回上一级 开始 -->
    <van-nav-bar title="会员登录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 返回上一级 结束 -->

    <!-- 登录注册功能 开始 -->
    <div class="total">
      <div class="tabs">
        <div class="tab-register" @click="active = 0" :class="{ tab_select: active == 0 }">
          <span>注册</span>
        </div>
        <div class="tab-login" @click="active = 1" :class="{ tab_select: active == 1 }">
          <span>登录</span>
        </div>
      </div>
      <div class="content">
        <div class="content-register" v-show="active == 0">
          <van-cell-group>
            <van-field
              v-model="registerUserName"
              center
              clearable
              placeholder="请输入账号或用户名"
              left-icon="manager-o"
            />
            <van-field v-model="registerPassword" placeholder="请输入密码" left-icon="bag-o" />
          </van-cell-group>
          <van-button type="default" class="register-btn" @click="OnClickRegister">
            注册
          </van-button>
        </div>
        <div class="content-login" v-show="active == 1">
          <van-cell-group>
            <van-field
              v-model="userName"
              type="tel"
              placeholder="请输入账号"
              left-icon="manager-o"
            />
            <!-- 输入密码 -->
            <van-field
              v-model="password"
              type="password"
              placeholder="请输入密码"
              left-icon="bag-o"
            />
          </van-cell-group>
          <van-button type="default" class="login-btn" @click="OnClickLogin"> 登录 </van-button>
        </div>
      </div>
    </div>
    <!-- 登录注册功能 结束 -->
  </div>
</template>

<script lang="ts">
import { Toast } from "vant";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { postRegisterAPI, postLoginAPI } from "@/api/login";

//返回上一级
const useReturnLevel = () => {
  const router = useRouter();
  const onClickLeft = () => {
    router.back();
  };
  return onClickLeft;
};

//用户注册
const useRegister = () => {
  const data = reactive({ registerUserName: "", registerPassword: "" }); //注册用户的账号和密码
  //用户点击注册
  const OnClickRegister = async () => {
    if (data.registerUserName == "") {
      Toast("请输入账号或用户名");
    } else if (data.registerPassword == "") {
      Toast("请输入密码");
    } else {
      await postRegisterAPI({
        userName: data.registerUserName,
        password: data.registerPassword,
      }).then((res) => {
        console.log(res);
        // 用户注册成功
        Toast("注册成功，请登录");
      });
    }
  };
  const { registerUserName, registerPassword } = toRefs(data);
  return { registerUserName, registerPassword, OnClickRegister };
};

//用户登录
const useLoginEffect = () => {
  const router = useRouter(); //路由
  const store = useStore(); //vuex仓库
  const params = reactive({ userName: "", password: "" }); //用户登录的账号和密码
  //用户点击登录
  const OnClickLogin = async () => {
    if (params.userName == "") {
      Toast("请输入账号或用户名");
    } else if (params.password == "") {
      Toast("请输入密码");
    } else {
      await postLoginAPI({
        userName: params.userName,
        password: params.password,
      })
        .then((res) => {
          // console.log(res);
          Toast("登录成功");
          //保存用户信息和token
          store.commit("SET_TOKEN", res.data.token);
          store.commit("SET_USERINFO", res.data.userInfo);
          router.push({ name: "Home" });
        })
        .catch((err) => {
          //登录失败，出现错误
          Toast(err.message);
        });
    }
  };
  const { userName, password } = toRefs(params);
  return { userName, password, OnClickLogin };
};

export default defineComponent({
  name: "Login",
  setup() {
    const active = ref(1); //当前激活标签对应的索引值，默认情况下启用第一个标签
    const { registerUserName, registerPassword, OnClickRegister } = useRegister(); //用户注册
    const { userName, password, OnClickLogin } = useLoginEffect(); //用户登录
    const onClickLeft = useReturnLevel(); //返回上一级

    return {
      active,
      registerUserName,
      registerPassword,
      OnClickRegister,
      userName,
      password,
      OnClickLogin,
      onClickLeft,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.login {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;

  .total {
    background: #fff;
    padding: 0;
    margin-top: 16%;

    .tabs {
      width: 60%;
      height: 80px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;

      .tab-register {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 36px;
        }
      }

      .tab-login {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 36px;
        }
      }

      .tab_select {
        border-color: transparent;
        border-bottom: 2px solid #3fbb47;
        color: #3fbb47;
      }
    }

    .content {
      height: 200px;
      margin-top: 40px;
      padding: 40px;

      .content-login {
        .login-btn {
          margin-top: 4%;
          width: 100%;
          padding: 20px 40px;
          border-radius: 100px;
          border: none;
          background: #3fbb47;
          color: #fff;
          font-size: 36px;
        }
      }

      .content-register {
        .register-btn {
          margin-top: 4%;
          width: 100%;
          padding: 20px 40px;
          border-radius: 100px;
          border: none;
          background: #3fbb47;
          color: #fff;
          font-size: 36px;
        }
      }
    }
  }
}
</style>
