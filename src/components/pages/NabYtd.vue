<template>
  <div>
    <div class="flex mb-3" v-for="(product, index) in products" :key="index">
      <div class="mr-6">{{product?.product_name}}</div>
      <div class="nab-value mr-2" :id="`nab-value-${index}`">{{product?.nab}}</div>
      |
      <div class="ytd-value ml-2" :id="`ytd-value-${index}`">{{product?.return_year_to_date}}</div>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const url = "http://trading.simasnet.com/ROL/web/nab.php";
      axios
        .get(url)
        .then((res) => {
          const data = res.data.results;
          // const sortedData = data.sort((a,b) => b.nab-a.nab)
          this.products = data;
          // const rawName = name.split('-');
          // let procName = []
          // for (let i = 0; i < rawName.length; i++) {
          //   procName.push(rawName[i].charAt(0).toUpperCase() + rawName[i].slice(1))
          // }
          // console.log(data)

          // const finalName = procName.join(' ');
          // console.log(finalName)
          // this.product = data.filter((el) => el.product_name === finalName)[0]
          // this.getChartData(this.product?.product_id)
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
  },
}
</script>
<style lang="">
  
</style>