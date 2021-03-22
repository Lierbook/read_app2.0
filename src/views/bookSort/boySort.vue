<template>
    <sort :data="this.$store.state.sortData[0]"></sort>
</template>

<script>
import sort from '../../components/sort'
export default {
    components:{
        sort
    }
}
</script>