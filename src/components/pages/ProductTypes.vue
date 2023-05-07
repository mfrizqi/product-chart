<template>
  <div>
    <div
      v-for="(product, index) in products"
      :key="index"
      class="px-4 py-4 mb-4 flex justify-between border rounded-lg bg-neutral-100 hover:bg-white product"
    >
      <div class="flex items-center">
        <div class="ml-2 mr-12 font-bold text-red-500">{{ index + 1 }}</div>
        <div class="mr-12 font-bold">{{ product.product_name }}</div>
        <div class="text-sm">
          <span class="text-gray-500 mr-4">Profil Resiko</span
          ><span class="text-green-600 font-bold">{{
            product.rating ? product.rating : "-"
          }}</span>
        </div>
      </div>
      <div class="flex">
        <div class="text-sm mr-12">
          NAB / Unit
          <span class="text-green-600 font-bold">Rp. {{ product.nab }}</span>
        </div>
        <div class="text-sm mr-6">
          YTD
          <span class="text-green-600 font-bold"
            >{{ product.return_year_to_date }}%</span
          >
        </div>
        <div @click="goto(product.product_name)">
          <img src="@/assets/arrow-up-right.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getMutualFunds();
  },
  methods: {
    getMutualFunds() {
      const type = this.$route.params.type;
      console.log(type);
      let url = "";

      if (process.env.NODE_ENV === "production") {
        url = window.location.origin + "/api/nab";
      } else {
        url = "http://trading.simasnet.com/ROL/web/nab.php";
      }
      axios
        .get(url)
        .then((res) => {
          const data = res.data.results;
          this.products = data.filter((el) => el.type_id === type);
          console.log("this.products");
          console.log(this.products);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    evaluateRating(rating) {
      switch (rating) {
        case "0":
          return "Rendah";
        case "2":
          return "Rendah";
        case "3":
          return "Menengah";
        case "4":
          return "Menengah Ke Tinggi";
        case "5":
          return "Tinggi";
        default:
          break;
      }
    },
    goto(name) {
      let urlname = name.toLowerCase().replace(/ /g, "-");
      const url = "https://sam.admire.id/" + urlname;
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.product:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);
}
</style>
