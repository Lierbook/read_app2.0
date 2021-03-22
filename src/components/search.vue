<template>
  <div class="seac">
    <van-search placeholder="请输入搜索关键词" @click="toSearch" />
    <img src="../images/更多.png" alt="" @click="toBookSort" />
  </div>
</template>

<style lang="scss" scoped>
.seac {
  background-color: #fff;
  position: relative;
  .van-search {
    width: 90%;
    display: inline-block;
  }
  img {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

<script>
export default {
  methods: {
    toSearch() {
      console.log("666");
      this.$router.push("/searchPage");
    },
    toBookSort() {
      this.$router.push("/booksort");
    },
  },
};
</script>

