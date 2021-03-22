<template>
  <div class="root">
    <titleCom :title="'分类'"></titleCom>
    <div class="main">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="男生" @click="comName = 'boySort'" />
        <van-sidebar-item title="女生" @click="comName = 'girlSort'" />
        <van-sidebar-item title="出版" @click="comName = 'publishSort'" />
      </van-sidebar>
      <loading v-if="this.$store.state.load"></loading>
      <div class="container" v-else>
        <component :is="comName"></component>
      </div>
    </div>
    <!-- {{this.$store.state.sortData}} -->
  </div>
</template>

<style lang="scss" scoped>
.root {
  position: relative;
  .main{
    margin-top: 30px;
  }
  .root:after {
    content: "";
    clear: both;
  }
  h3 {
    margin-bottom: 10px;
  }
  .van-sidebar {
    height: 622px;
    float: left;
    background-color: #fff;
    .van-sidebar-item {
      position: relative;
      z-index: 200;
      color: #505050;
      background-color: #fff;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #ececec;
      height: 80px;
      /deep/.van-sidebar-item__text {
        line-height: 42px;
      }
    }
    .van-sidebar-item--select {
      background-color: #ececec;
    }
  }
}
</style>

<script>
import loading from "../../components/loading";
import titleCom from "../../components/titleCom";
import boySort from "./boySort.vue";
import girlSort from "./girlSort.vue";
import publishSort from "./publishSort.vue";
export default {
  data() {
    return {
      activeKey: 0,
      comName: "boySort",
    };
  },
  components: {
    loading,
    titleCom,
    boySort,
    girlSort,
    publishSort,
  },
  created() {
    this.$store.dispatch("getSortData");
  },
};
</script>