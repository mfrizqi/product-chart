<template>
  <div class="md:m-6 m-1">
    <div class="mb-4">
      <h1 class="mt-10 mb-1 text-4xl font-bold text-center">
        Perencanaan Reksadana
      </h1>
      <div class="text-sm text-center text-slate-500 px-5">
        Sinarmas bisa membantu kamu mencapai impian melalui investasi
      </div>
    </div>
    <div class="container lg:flex">
      <div
        style="height: 350px"
        class="bg-slate-100 rounded-md lg:mr-6 md:mt-0 mt-4 p-5 mb-4 lg:w-max md:w-full"
      >
        <div class="text-2xl font-bold mb-2">
          Yuk coba simulasikan investasi kamu!
        </div>
        <div class="flex flex-col mb-3">
          <label for="first_invest">Investasi Awal</label>
          <input
            name="first_invest"
            type="text"
            class="rounded-md p-2"
            placeholder="Rp1.000.000"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label for="monthly_invest">Investasi Bulanan</label>
          <input
            name="monthly_invest"
            type="text"
            class="rounded-md p-2"
            placeholder="Rp1.000.000"
          />
        </div>
        <button
          class="w-full p-4 rounded button-gradient font-semibold text-white"
        >
          Simulasikan
        </button>
      </div>
      <ProductChartVue class="lg:grow"/>
    </div>
  </div>
</template>

<script>
import ProductChartVue from "@/components/ProductChart.vue";

export default {
  name: "InvestmentPlan",
  components: {
    ProductChartVue,
  },
  mounted() {},
  data() {
    return {
      product: {},
    };
  },
};
</script>

<style scoped>
.button-gradient {
  background: #11998e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    245deg,
    #38ef7d,
    #11998e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    245deg,
    #38ef7d,
    #11998e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
