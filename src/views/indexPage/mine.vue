<template>
  <div>
    <van-nav-bar title="我的" />
    <div>
      <van-image
        round
        width="5rem"
        height="5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <div class="info">
      <p style="font-size:20px;">{{$store.state.userInfo.user}}</p>
      <p>ID:{{$store.state.userInfo.userid}}</p>
    </div>
    <van-cell title="浏览记录" is-link @click="bookHistories" />
    <van-cell title="联系客服" value="得间免费" />
    <van-cell title="用户QQ群" value="QQ:358582914" />
    <van-button type="danger" @click="exit">退出登录</van-button>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin: 10px;
  text-align: center;
}
.van-image {
  display: table;
  margin: 0 auto;
}
.info {
  margin-top: 20px;
  text-align: center;
  width: 100%;
  height: 50px;
}
[class*="van-hairline"]::after {
  border: 0px;
}
/deep/.van-nav-bar {
  .van-nav-bar__title {
    font-weight: 700;
  }
}
.van-button {
  display: block;
  margin: 10px auto 0;
  height: 30px;
  width: 345px;
}
</style>
<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    bookHistories() {
      this.$router.push("/bookHistories");
    },
    exit(){
      this.$store.commit("addUserInfo",{})
      this.$router.push("/login");
    }
  },
  created(){
    console.log(this.$store.state.userInfo,"vuex");
  }
};
</script>

