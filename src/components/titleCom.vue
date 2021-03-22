<template>
    <h3><van-icon name="arrow-left" size="25" @click="back"/><van-icon name="wap-home" size="26" @click="home"/>{{title}}</h3>
</template>

<script>
export default {
    props:["title"],
    methods:{
        back(){
            this.$router.go(-1)
        },
        home(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
h3{
    font-size: 18px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: fixed;
    background-color: #fff;
    top: 0;
    z-index: 300;
    box-shadow: 0px 0 15px 5px #cecece2a;
}
h3 .van-icon:first-of-type{
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
}
h3 .van-icon:last-of-type{
    position: absolute;
    left: 55px;
    top: 50%;
    transform: translateY(-50%);
}
</style>