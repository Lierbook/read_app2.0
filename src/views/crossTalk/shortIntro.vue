<!-- 相声的专辑介绍-->
<template>
  <div class="box">
    <div class="title">
      <span class="line">——</span>简介
      <span class="line">——</span>
    </div>
    <div v-html="this.allInfo" class="allInfo"></div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgb(211, 210, 210);
  padding: 10px;
  line-height: 30px;
  height: 397px;
  overflow:scroll;
}
.title {
  width: 100%;
  text-align: center;
  margin: 15px 0;
}
.line {
  color: rgb(207, 206, 206);
  font-weight: 300;
}
.allInfo {
  /deep/img {
    width: 100%;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  props: ["allInfo"],
  created() {
    // console.log(this.allInfo);
  },
};
</script>