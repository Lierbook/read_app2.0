<template>
    <div class="root">
        <div class="content" v-if="data !== undefined">
            <div class="box" v-for="book in data.items" :key="book.categoryId" @click="toList(book.resourcesId,book.categoryId)">
                <div class="title">{{book.name}}</div>
                <img :src="book.pics[0]" alt="">
                <img :src="book.pics[1]" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["data"],
    methods:{
        toList(resourcesId,categoryId){
            this.$router.push({ path: '/bookSortList', query: { 
                resourcesId,
                categoryId
             }})
        }
    }
}
</script>

<style lang="scss" scoped>
.root{
    margin-left: 80px;
    height: 622px;
    background-color: #ececec;
    .content{
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        .box{
            width: 75px;
            height: 100px;
            margin-left: 18px;
            margin: 35px 0 0 18px;
            border-radius: 6px;
            box-shadow: 0 5px 10px -2px #c2c2c2;
            background-color: #f1f1f1;
            position: relative;
            .title{
                background-color: #fff;
                border-radius: 6px 6px 0 0;
                height: 25px;
                line-height: 25px;
                color: #505050cb;
                font-weight: 600;
                padding-left: 8px;
                font-size: 14px;
            }
            img{
                position: absolute;
            }
            img:nth-of-type(1){
                width: 42px;
                height: 60px;
                top: 32px;
                left: 5px;
                z-index: 200;
            }
            img:nth-of-type(2){
                width: 42px;
                height: 50px;
                top: 39px;
                left: 27px;
                z-index: 100;
            }
        }
    }
}
</style>