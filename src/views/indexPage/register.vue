<template>
  <div>
    <van-nav-bar title="我的" />
    
    <div class="login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="name"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-image{
  margin: auto;
}
.login {
  position: relative;
  margin-top: 1%;
}
.van-form {
  .van-cell {
    width: 80%;
    padding: 10px 16px;
    margin: 20px auto;
    border: 1px #ccc solid;
  }
  .van-button {
    margin: auto;
    width: 75%;
  }
  .van-button:nth-child(2) {
    margin: 16px auto;
    width: 75%;
  }
}
[class*="van-hairline"]::after {
  border: 0px;
}
</style>
<script>
import {register} from '../../utils/api'
import axiosGetHttp from '../../utils/axiosGetHttp'
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      axiosGetHttp("post",register,values)
      this.$router.push('/login')
    }
  }
};
</script>
