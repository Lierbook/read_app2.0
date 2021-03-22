<template>
  <div id="root">
    <loading v-if="load"></loading>
    <book-city-component
      v-else
      :data1="data1"
      :data2="data2"
      :data3="data3"
      :data4="data4"
      :data5="data5"
      :data6="data6"
      :data7="data7"
      @func="newData"
    ></book-city-component>
  </div>
</template>

<script>
import { boysUrl } from "../../utils/api.js";
import axiosGetHttp from "../../utils/axiosGetHttp.js";
import bookCityComponent from "../../components/bookCityComponent";
import loading from "../../components/loading"
export default {
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      data7: [],
      load: true,
    };
  },
  components: {
    bookCityComponent,
    loading
  },
  created() {
    console.log(boysUrl);
    this.getBoysInfo();
  },
  methods: {
    async getBoysInfo() {
      let res = await axiosGetHttp("get", boysUrl);
      if (res.msg == "ok") {
        let data = res.body.data;
        this.data1 = data[0];
        this.data2 = data[1];
        this.data3 = data[2];
        this.data4 = data[3];
        this.data5 = data[4];
        this.data6 = data[5];
        this.data7 = data[6];
        this.load = false;
      }
    },
    async newData(key){
      let res = await axiosGetHttp("get", boysUrl);
      if(key == 3){
        this.data3 = res.body.data[2];
      }else{
        this.data5 = res.body.data[4];
      }
    }
  },
};
</script>
