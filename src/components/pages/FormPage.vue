<template>
  <div style="max-width: 720px" class="mx-auto mt-6">
    <div class="mb-6">
      <div class="font-semibold mb-3">Dana anda saat ini</div>
      <div class="flex items-center">
        <div class="border border-slate-300 px-3 py-2 sm:text-sm">Rp</div>
        <input
          type="number"
          name="text"
          v-model="form.initialFund"
          @change="checkFund()"
          class="px-3 py-2 bg-gray-200 border-t border-r border-b shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
          placeholder="Masukan Dana anda saat ini"
        />
      </div>
    </div>
    <div class="mb-6">
      <div class="font-semibold mb-3">Jangka Waktu Investasi</div>
      <div class="flex items-center">
        <input
          type="number"
          name="text"
          class="px-3 py-2 bg-gray-200 border-t border-l border-b shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
          placeholder="Masukan jangka waktu investasi"
          @change="checkDuration()"
          v-model="form.duration"
        />
        <div class="border border-slate-300 px-3 py-2 sm:text-sm">Tahun</div>
      </div>
    </div>
    <div class="mb-6">
      <div class="font-semibold mb-3">Produk Investasi</div>
      <select
        class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
        @change="selectChange($event)"
      >
        <option
          class="mb-6"
          :value="invest.code"
          v-for="(invest, index) in productInvest"
          :key="index"
        >
          {{ invest.name }}
        </option>
      </select>
    </div>
    <div class="mb-6">
      <div class="font-semibold mb-3">Nilai investasi anda di masa depan</div>
      <div class="flex items-center">
        <div class="border border-slate-300 px-3 py-2 sm:text-sm">Rp</div>
        <input
          type="number"
          v-model="form.outputTotal"
          readonly
          class="px-3 py-2 bg-gray-200 border-t border-r border-b shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
          placeholder="Masukan Dana anda saat ini"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <div class="rounded-lg border px-4 py-2 font-semibold cursor-pointer" @click="resetForm()">
        Reset
      </div>
      <div
        class="rounded-lg border px-6 py-2 bg-red-600 text-white font-semibold cursor-pointer tracking-wide flex"
        @click="calculateInvest()"
        :disabled="isLoading"
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          v-if="isLoading"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Hitung
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const PRODUCT_INVEST = [
  {
    aum: 66693590430.58,
    category: "Pendapatan Tetap",
    code: "005",
    difference: 0.63,
    initial_purchase: 500000,
    minimum_buy: 500000,
    minimum_sell: 100000,
    name: "Danamas Pasti",
    nav: 4414.9796,
    nav_datetime: "28 Mar 2023",
    percentage: 1.27,
    unit: 15106205.7978,
    one_year: 5.12,
    mi_logo: "",
  },
  {
    aum: 1953852829703.9,
    category: "Pasar Uang",
    code: "014",
    difference: 0.17,
    initial_purchase: 100000,
    minimum_buy: 100000,
    minimum_sell: 100000,
    name: "Danamas Rupiah Plus",
    nav: 1630.8932,
    nav_datetime: "28 Mar 2023",
    percentage: 0.92,
    unit: 1198026228.6359,
    one_year: 3.73,
    mi_logo: "",
  },
  {
    aum: 16471985316543,
    category: "Pendapatan Tetap",
    code: "008",
    difference: 0.66,
    initial_purchase: 10000000,
    minimum_buy: 5000000,
    minimum_sell: 100000,
    name: "Danamas Stabil",
    nav: 4362.0382,
    nav_datetime: "28 Mar 2023",
    percentage: 1.33,
    unit: 3776212990.6481,
    one_year: 5.55,
    mi_logo: "",
  },
  {
    aum: 15313909964.78,
    category: "Saham",
    code: "020",
    difference: 23.3,
    initial_purchase: 100000,
    minimum_buy: 100000,
    minimum_sell: 100000,
    name: "Simas Danamas Saham",
    nav: 1502.127,
    nav_datetime: "28 Mar 2023",
    percentage: -3.77,
    unit: 10194817.0593,
    one_year: -4.89,
    mi_logo: "",
  },
  {
    aum: 35980985905.36,
    category: "Saham",
    code: "108",
    difference: 11.56,
    initial_purchase: 100000,
    minimum_buy: 100000,
    minimum_sell: 100000,
    name: "Simas Saham Bertumbuh",
    nav: 1170.2118,
    nav_datetime: "28 Mar 2023",
    percentage: 0.68,
    unit: 30747413.3361,
    one_year: -1.13,
    mi_logo: "",
  },
  {
    aum: 99803099681.52,
    category: "Saham",
    code: "132",
    difference: 8.64,
    initial_purchase: 100000,
    minimum_buy: 100000,
    minimum_sell: 100000,
    name: "Simas Saham Maksima",
    nav: 976.9008,
    nav_datetime: "28 Mar 2023",
    percentage: 1,
    unit: 102162982.8551,
    one_year: -2.63,
    mi_logo: "",
  },
  {
    aum: 73338698681.85,
    category: "Campuran",
    code: "002",
    difference: 51.28,
    initial_purchase: 100000,
    minimum_buy: 100000,
    minimum_sell: 100000,
    name: "Simas Satu",
    nav: 7201.8797,
    nav_datetime: "28 Mar 2023",
    percentage: -0.29,
    unit: 10183271.8314,
    one_year: -7.83,
    mi_logo: "",
  },
  {
    aum: 41637178933.2,
    category: "Campuran",
    code: "049",
    difference: 12.51,
    initial_purchase: 100000,
    minimum_buy: 100000,
    minimum_sell: 100000,
    name: "Simas Satu Prima",
    nav: 1476.9818,
    nav_datetime: "28 Mar 2023",
    percentage: -1.18,
    unit: 28190719.028,
    one_year: -7.04,
    mi_logo: "",
  },
  {
    aum: 14775042799.44,
    category: "Pendapatan Tetap",
    code: "150",
    difference: 0.17,
    initial_purchase: 10000000,
    minimum_buy: 5000000,
    minimum_sell: 100000,
    name: "Simas Syariah Pendapatan Tetap",
    nav: 1199.9879,
    nav_datetime: "28 Mar 2023",
    percentage: 1.26,
    unit: 12312659.8189,
    one_year: 5.12,
    mi_logo: "",
  },
];

export default {
  data() {
    return {
      productInvest: PRODUCT_INVEST,
      outputTotal: 0,
      isLoading: false,
      form: {
        initialFund: 0,
        duration: 0,
        productCode: '005',
        outputTotal: 0,
      },
    };
  },
  methods: {
    selectChange(ev) {
      console.log(ev.target.value);
      this.form.productCode = ev.target.value
    },
    checkFund() {
      if (this.form.initialFund < 0) {
        this.form.initialFund = 0;
      }
    },
    checkDuration() {
      if (this.form.duration < 0) {
        this.form.duration = 0;
      }

      if (this.form.duration > 50) {
        this.form.duration = 50;
      }
    },
    resetForm() {
      this.form.initialFund = 0
      this.form.duration = 0
      this.form.outputTotal = 0
    },
    calculateInvest() {
      this.form.outputTotal = 100000000;
      this.isLoading = true;
      const url = "https://api.siminvest.co.id/api/v1/pcs/calculator";
      const req = {
        installment: this.form.initialFund.toString(),
        duration: this.form.duration.toString(),
        product_id: this.form.productCode,
      };
      console.log(req);
      axios
        .post(url, req, {
          headers: {
            Authorization: `Basic ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if(res.data.result){
            this.form.outputTotal = res.data.result
          }
           if(res.result){
            this.form.outputTotal = res.result
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
