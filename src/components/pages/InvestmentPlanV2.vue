<template>
  <div class="lg:m-6 m-4">
    <div class="lg:relative">
      <!-- Idle state -->
      <div
        class="rounded-md lg:mr-6 md:mt-0 mt-4 p-5 mb-4 lg:w-80 md:w-full self-start lg:absolute z-10 bg-white"
        style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16); z-index: 10"
        v-if="isIdle"
      >
        <div class="text-lg font-bold mb-4">Estimasi Perhitungan</div>
        <div class="mb-6">
          <div class="font-semibold mb-3 font-sm">Produk Investasi</div>
          <select
            class="px-3 py-2 bg-white border shadow-sm rounded border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
            @change="selectChange($event)"
          >
            <option
              class="mb-6"
              :data-value="invest"
              v-for="(invest, index) in productInvest"
              :key="index"
            >
              {{ invest.product_name }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-3 font-sm">Nilai Investasi/Bulan</div>
          <div class="flex items-center">
            <div
              class="border-t border-l rounded-l border-b border-slate-300 px-3 py-2 sm:text-sm font-bold"
            >
              Rp
            </div>
            <input
              type="number"
              name="text"
              v-model="form.initialFund"
              @change="checkFund()"
              class="px-3 py-2 border-t border-r border-b shadow-sm rounded-r border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
              placeholder="500.000"
            />
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-3 font-sm">Dalam Kurun Waktu</div>
          <div class="flex items-center">
            <select
              class="px-3 py-2 bg-white border shadow-sm rounded border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
              @change="selectPeriod($event)"
            >
              <option
                class="mb-6"
                :value="period"
                v-for="(period, index) in periodInvest"
                :key="index"
              >
                {{ period }} Tahun
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-col mb-3 hidden">
          <label for="monthly_invest" class="mb-2 font-medium"
            >Investasi Bulanan</label
          >
          <div class="flex items-center">
            <div class="mr-1 font-semibold">Rp.</div>
            <input
              v-model="monthlyValue"
              name="monthly_invest"
              type="number"
              class="rounded-md p-2 grow shrink"
              placeholder="500.000"
              @keypress="numberOnly($event)"
            />
          </div>
        </div>
        <button
          class="w-full p-4 rounded bg-red-600 font-semibold text-white mt-4"
          :disabled="investValue === 0 && monthlyValue === 0"
          @click="submitCalculate()"
        >
          <span class="tracking-wider text-sm">Hitung Keuntungannya</span>
        </button>

        <div class="text-sm mt-6">
          <div class="font-semibold mb-3">Disclaimer</div>

          <div>
            Perhitungan kalkulator investasi diatas merupakan alat bantu alat
            bantu simulasi dan bukan merupakan saran investasi.
          </div>
        </div>
      </div>

      <!--  -->
      <!-- Calculated state -->
      <!--  -->

      <div
        class="rounded-md lg:mr-6 md:mt-0 mt-4 p-5 mb-4 lg:w-80 md:w-full self-start lg:absolute z-10 bg-white"
        style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16); z-index: 10"
        v-if="!isIdle"
      >
        <div class="text-lg font-bold mb-4">Estimasi Perhitungan</div>
        <div class="text-sm font-bold mb-4">
          Perbandingan kinerja produk Reksadana dengan Deposito:
        </div>

        <div class="text-sm font-bold mb-4">Produk Investasi</div>

        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Simas Satu</div>
            <div>Rp. 0</div>
          </div>
          <div>
            <div>Deposito</div>
            <div>Rp.0</div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Imbal hasil 1 tahun</div>
            <div>5.55%</div>
          </div>
          <div>
            <div>Bunga setelah pajak</div>
            <div>2.99%</div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Pajak Imbal Hasil</div>
            <div>Rp. 0</div>
          </div>
          <div>
            <div>Pajak Bunga</div>
            <div>Rp.0</div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Investasi Awal</div>
            <div>Rp. 0</div>
          </div>
          <div>
            <div>Investasi Awal</div>
            <div>Rp.0</div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Waktu Pencairan</div>
            <div>> 0 Bulan</div>
          </div>
          <div>
            <div>Waktu Pencairan</div>
            <div>1- 12 Bulan</div>
          </div>
        </div>
        <button
          class="w-full p-4 rounded bg-red-600 font-semibold text-white mt-4"
        >
          <span class="tracking-wider text-sm">Mulai Investasi</span>
        </button>

        <div class="text-sm mt-6">
          <div class="font-semibold mb-3">Disclaimer</div>
          <div>
            Perhitungan kalkulator investasi diatas merupakan alat bantu alat
            bantu simulasi dan bukan merupakan saran investasi.
          </div>
        </div>
      </div>
    </div>
    <ProductCalcV2
      class="lg:grow shrink lg:pt-16 md:pt-0 absolute left-5 right-0 top-40"
      :calc-invest="arrInvest"
      :calc-deposito="arrDeposito"
      :calc-saving="arrSaving"
    />
  </div>
</template>

<script>
import ProductCalcV2 from "@/components/ProductCalcV2.vue";
import axios from "axios";

export default {
  name: "InvestmentPlan",
  components: {
    ProductCalcV2,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      product: {},
      productInvest: [],
      investAmount: null,
      arrInvest: [],
      arrSaving: [],
      arrDeposito: [],
      investValue: null,
      monthlyValue: null,
      periodInvest: [1, 10, 20],
      form: {
        initialFund: null,
        duration: 0,
        product: null,
        outputTotal: 0,
        periodInvest: 1,
        startDate: null,
        endDate: null,
      },
      isIdle: true,
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
    checkFund() {
      if (this.form.initialFund < 0) {
        this.form.initialFund = null;
      }

      const amount = this.form.initialFund.toString();
      this.form.initialFund = amount;
      console.log(amount);
      console.log(parseInt(amount));
      if (amount[0] === "0") {
        console.log("detect 0 front");
        amount.slice(1);
        this.form.initialFund = parseInt(amount);
      }
    },
    selectPeriod(ev) {
      this.form.periodInvest = ev.target.value;
    },
    getData() {
      const url = "https://trading.simasnet.com/ROL/web/nab.php";
      axios
        .get(url)
        .then((res) => {
          const data = res.data.results;
          console.log(data);
          this.productInvest = data;
          this.form.product = this.productInvest[0];
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    submitCalculate() {
      // this.arrInvest = [];
      // this.arrDeposito = [];
      // let inv = 0;
      // let depo = 0;
      // let saving = 0;
      // inv = this.initialFund;
      // depo = this.initialFund;

      // this.arrInvest.push(inv);
      // this.arrDeposito.push(depo);
      // this.arrSaving.push(saving);

      // let monthly = 12;

      // for (let i = 1; i < this.form.duration; i++) {
      //   inv =
      //     inv +
      //     this.monthlyValue * Math.pow(1 + 13 / 100 / 12, 12 * i) * monthly;
      //   depo =
      //     depo +
      //     this.monthlyValue * Math.pow(1 + 8 / 100 / 12, 12 * i) * monthly;
      //   saving =
      //     saving +
      //     this.monthlyValue * Math.pow(1 + 0 / 100 / 12, 12 * i) * monthly;

      //   this.arrInvest.push(inv);
      //   this.arrDeposito.push(depo);
      //   this.arrSaving.push(saving);
      // }

      this.isIdle = false
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
