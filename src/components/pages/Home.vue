<template>
  <ProductChartVue />
</template>

<script>
import ProductChartVue from "../ProductChart.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    ProductChartVue,
  },
  data() {
    var self = this;
    return {
      token: "YnNpbS1zdGc6YnNpbXN0Zw==",
      axiosConfig: {
        Authorization: `Basic ${self.token}`,
      },
    };
  },
  mounted() {
    // axios.defaults.headers.get["Authorization"] = `Basic ${this.token}`;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    this.getData();
  },
  methods: {
    getData() {
      const url = "https://bsim.siminvest.co.id/api/v1/pcs/products/fund";
      // const config = {
      //   headers: {
      //     Authorization: `Basic ${this.token}`,
      //   },
      // };
      axios
        .get(url, {
          headers: {
            Authorization: `Basic ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          // this.data = res.data;
          // const cValue = this.data.results.map((el) => el.c);
          // const dataDates = this.calculateStockDates(this.data.results);
          // this.chartData.datasets[0].data = cValue;
          // this.chartData.labels = dataDates;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
