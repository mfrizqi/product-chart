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
    <div class="lg:flex">
      <div
        class="bg-slate-100 rounded-md lg:mr-6 md:mt-0 mt-4 p-5 mb-4 lg:w-max md:w-full self-start"
      >
        <div class="text-2xl font-bold mb-2">
          Yuk coba simulasikan investasi kamu!
        </div>
        <div class="flex flex-col mb-3">
          <label for="first_invest" class="mb-2">Investasi Awal</label>
          <div class="flex items-center">
            <div class="mr-2">Rp.</div>
            <input
              v-model="investValue"
              name="first_invest"
              type="number"
              class="rounded-md p-2 grow shrink"
              placeholder="1.000.000"
              @keypress="numberOnly($event)"
            />
          </div>
        </div>
        <button
          class="w-full p-4 rounded button-gradient font-semibold text-white"
          @click="submitCalculate()"
        >
          Simulasikan
        </button>
      </div>
      <ProductCalc class="lg:grow shrink" :calc-invest="arrInvest" />
    </div>
  </div>
</template>

<script>
import ProductCalc from "@/components/ProductCalc.vue";

export default {
  name: "InvestmentPlan",
  components: {
    ProductCalc,
  },
  mounted() {},
  data() {
    return {
      product: {},
      investAmount: null,
      arrInvest: [],
      investValue: null,
    };
  },
  methods: {
    numberOnly(evt) {
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault();
      }
    },
    submitCalculate() {
      this.arrInvest = [];
      for (let i = 0; i < 25; i++) {
        var inv = this.investValue * Math.pow(1 + 5 / 100 / 12, 12 * i);
        this.arrInvest.push(inv);
      }
    },
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
