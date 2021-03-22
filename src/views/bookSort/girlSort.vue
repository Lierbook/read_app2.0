<template>
    <sort :data="this.$store.state.sortData[1]"></sort>
</template>

<script>
import sort from '../../components/sort'
export default {
    components:{
        sort
    }
}
</script>