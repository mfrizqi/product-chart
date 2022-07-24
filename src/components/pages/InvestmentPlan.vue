<template>
  <div class="lg:m-6 m-4">
    <div class="mb-4">
      <h1 class="mt-10 mb-1 text-4xl font-bold text-center">
        Perencanaan Reksadana
      </h1>
      <div class="text-sm text-center text-slate-500 px-5 mb-6">
        Sinarmas bisa membantu kamu mencapai impian melalui investasi
      </div>
    </div>
    <div class="lg:relative">
      <div
        class="bg-slate-100 rounded-md lg:mr-6 md:mt-0 mt-4 p-5 mb-4 lg:w-80 md:w-full self-start lg:absolute z-10"
      >
        <div class="text-2xl font-bold mb-2">
          Yuk coba simulasikan investasi kamu!
        </div>
        <div class="flex flex-col mb-3">
          <label for="first_invest" class="mb-2 font-medium">Investasi Awal</label>
          <div class="flex items-center">
            <div class="mr-1 font-semibold">Rp.</div>
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
        <div class="flex flex-col mb-3">
          <label for="monthly_invest" class="mb-2 font-medium">Investasi Bulanan</label>
          <div class="flex items-center">
            <div class="mr-1 font-semibold">Rp.</div>
            <input
              v-model="monthlyValue"
              name="monthly_invest"
              type="number"
              class="rounded-md p-2 grow shrink"
              placeholder="1.000.000"
              @keypress="numberOnly($event)"
            />
          </div>
        </div>
        <button
          class="w-full p-4 rounded button-gradient font-semibold text-white mt-4"
          :disabled="investValue === 0 && monthlyValue === 0"
          @click="submitCalculate()"
        >
          Simulasikan
        </button>
      </div>
      <ProductCalc
        class="lg:grow shrink lg:pt-16 md:pt-0"
        :calc-invest="arrInvest"
        :calc-deposito="arrDeposito"
        :calc-saving="arrSaving"
      />
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
      arrSaving: [],
      arrDeposito: [],
      investValue: null,
      monthlyValue: null,
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
      this.arrDeposito = [];
      this.arrSaving = [];
      let inv = 0;
      let depo = 0;
      let saving = 0;
      inv = this.investValue;
      depo = this.investValue;
      saving = this.investValue;

      this.arrInvest.push(inv);
      this.arrDeposito.push(depo);
      this.arrSaving.push(saving);

      let monthly = 12;

      for (let i = 1; i < 25; i++) {
        inv = inv + this.monthlyValue * Math.pow(1 + 13 / 100 / 12, 12 * i) * monthly;
        depo =
          depo + this.monthlyValue * Math.pow(1 + 8 / 100 / 12, 12 * i) * monthly;
        saving =
          saving + this.monthlyValue * Math.pow(1 + 0 / 100 / 12, 12 * i) * monthly;
          
        this.arrInvest.push(inv);
        this.arrDeposito.push(depo);
        this.arrSaving.push(saving);
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
