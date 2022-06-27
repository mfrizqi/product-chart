<template>
  <div class="container mx-auto mt-16">
    <div class="p-4 drop-shadow-md bg-white rounded-md">
      <h1 class="font-bold text-4xl mb-6">Produk</h1>
      <ProductAccordion v-for="(cat, i) in categories" :key="i">
        <template v-slot:title>
          <div class="font-medium text-3xl text-white p-4">
            {{ cat.title }}
          </div>
        </template>
        <template v-slot:content>
          <div class="pt-5">
            <div
              class="p-6 flex border-b border-b-slate-600 cursor-pointer"
              v-for="(product, j) in cat.products"
              :key="j"
            >
              <div class="text-xl font-medium">{{ j + 1 }}</div>
              <div class="red-bar mx-4"></div>
              <div class="text-xl font-medium">{{ product.name }}</div>
              <!-- <button class="p-4 mr-4 mb-2 bg-red-600 text-white font-medium" v-for="(product, j) in cat.products" :key="j">
                {{ product.name }}
              </button> -->
            </div>
          </div>
        </template>
      </ProductAccordion>
    </div>
  </div>
</template>

<script>
import ProductAccordion from "@/components/ProductAccordion.vue";

export default {
  name: "reksadanaCampuran",
  components: {
    ProductAccordion,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      categories: [
        {
          title: "REKSADANA PASAR UANG",
          products: [{ name: "Danamas Rupiah Plus" }],
        },
        {
          title: "REKSA DANA PENDAPATAN TETAP",
          products: [
            { name: "Danamas Stabil" },
            { name: "Danamas Dollar" },
            { name: "Simas Danamas Instrumen Negara" },
            { name: "Danamas pasti" },
            { name: "Simas Syariah Pendapatan Tetap" },
          ],
        },
        {
          title: "REKSA DANA CAMPURAN",
          products: [
            { name: "Simas Syariah Berkembang" },
            { name: "Simas Satu" },
            { name: "Danamas Fleksi" },
            { name: "Simas Satu Prima" },
            { name: "Simas Balance Syariah" },
          ],
        },
        {
          title: "REKSA DANA SAHAM",
          products: [
            { name: "Simas Syariah Unggulan" },
            { name: "Simas Danamas Saham" },
            { name: "Simas Saham Unggulan" },
            { name: "Simas Saham Bertumbuh" },
            { name: "Simas Saham Maksima" },
            { name: "Syariah Simas Equity Syariah" },
          ],
        },
        {
          title: "REKSA DANA TERPROTEKSI",
          products: [
            { name: "Simas Terproteksi 5" },
            { name: "Simas Terproteksi 6" },
            { name: "Simas Terproteksi 9" },
            { name: "Simas Terproteksi 10" },
            { name: "Simas Gemilang 4" },
          ],
        },
        {
          title: "ETF",
          products: [{ name: "Simas ETF IDX30" }, { name: "Simas ETF JII" }],
        },
      ],
    };
  },
};
</script>

<style scoped>
.red-bar {
  background-color: red;
  width: 2px;
  height: auto;
}
</style>
