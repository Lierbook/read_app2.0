<template>
  <div>
    <router-view class="main"></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/bookshelf">
        <span>书架</span>
        <template #icon="props">
          <img :src="props.active ? icon.active1 : icon.inactive1" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/bookCity">
        <span>书城</span>
        <template #icon="props">
          <img :src="props.active ? icon.active2 : icon.inactive2" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/ranking">
        <span>排行</span>
        <template #icon="props">
          <img :src="props.active ? icon.active3 : icon.inactive3" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/crosstalk">
        <span>相声</span>
        <template #icon="props">
          <img :src="props.active ? icon.active4 : icon.inactive4" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="$store.state.userInfo.user==undefined?'/login':'/mine'">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon.active5 : icon.inactive5" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      icon: {
        active1: require("../images/icon_书架 (1).png"),
        inactive1: require("../images/icon_书架.png"),
        active2: require("../images/书 书签 (1).png"),
        inactive2: require("../images/书 书签.png"),
        active3: require("../images/排行(1).png"),
        inactive3: require("../images/排行.png"),
        active4: require("../images/相声评书 (1).png"),
        inactive4: require("../images/相声评书.png"),
        active5: require("../images/我的客户 (1).png"),
        inactive5: require("../images/我的客户.png"),
      },
    };
  },
  created() {
    /* this.active = this.$route.meta.idx;
    console.log(this.$route) */
  }
};
</script>

<style lang="scss">
#app {
  .van-tabbar {
    height: 60px;
    .van-tabbar-item {
      color: #bfbfbf;
      font-size: 14px;
      font-weight: 600;
    }
    .van-tabbar-item--active {
      color: orangered;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>