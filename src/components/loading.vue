<template>
    <van-loading size="24px" vertical>加载中...</van-loading>
</template>

<style lang="scss" scoped>
.van-loading{
  width: 130px;
  height: 130px;
  margin: auto;
  border-radius: 5px;
  background-color: #02020288;
  margin-top: 50px;
  span:first-child{
    top: 35px;
  }
  span:last-child{
    position: relative;
    top: 45px;
  }
  span{
    color: #fff;
  }
}
</style>