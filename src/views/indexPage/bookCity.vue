<template>
  <div class="root">
    <div class="topTitle">兮翱诗沃·免费小说</div>
    <van-tabs v-model="activeName" animated >
      <van-tab title="男生" name="a"><boys></boys></van-tab>
      <van-tab title="女生" name="b"><girls></girls></van-tab>
      <van-tab title="出版" name="c"><publishing></publishing></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import boys from "../bookCitySort/boys";
import girls from "../bookCitySort/girls";
import publishing from "../bookCitySort/publishing";

export default {
  data() {
    return {
      activeName: "a",
    };
  },
  components: {
    boys,
    girls,
    publishing,
  },
};
</script>

<style lang="scss" scoped>
.main{
    margin-top: 30px;
}
/deep/.van-tabs--line .van-tabs__wrap {
  height: 50px !important;
  .van-tabs__nav {
    float: left;
    span {
      overflow: initial;
      font-size: 17px;
      color: #4d4d4d;
      font-weight: 900;
    }
    .van-tabs__line {
      width: 20px;
      background-color: #ec594e;
    }
    .van-tab--active {
      width: 120px;
      span {
        font-size: 25px;
        color: #ec594e;
      }
    }
  }
}
</style>