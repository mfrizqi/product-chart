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
              {{ invest.name }}
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
              type="text"
              name="initialFund"
              ref="initialFund"
              v-model="form.initialDisplay"
              @change="checkFund()"
              class="px-3 py-2 border-t border-r border-b shadow-sm rounded-r border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
              placeholder="500.000"
              @keypress="numberOnly($event)"
              @focus="convertInitial(true)"
              @blur="convertInitial(false)"
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
          class="w-full p-4 rounded bg-red-600 font-semibold text-white mt-4 flex justify-center"
          :disabled="(investValue === 0 && monthlyValue === 0) || isLoading"
          @click="calculateInvest()"
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
            <div>{{ form?.product?.name }}</div>
            <div>Rp.{{ formatDecimals(form.calculateData?.result) }}</div>
          </div>
          <div>
            <div>Deposito</div>
            <div>
              Rp.{{ formatDecimals(form.calculateData?.deposito_result) }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Imbal hasil 1 tahun</div>
            <div>{{ form.calculateData?.interest }}%</div>
          </div>
          <div>
            <div>Bunga setelah pajak</div>
            <div>{{ form.calculateData?.deposito_interest }}%</div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Pajak Imbal Hasil</div>
            <div>{{ form.calculateData?.pajak_imbal_hasil }}</div>
          </div>
          <div>
            <div>Pajak Bunga</div>
            <div>{{ form.calculateData?.pajak_bunga }}</div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Investasi Awal</div>
            <div>
              Rp {{ formatDecimals(form.calculateData?.investasi_awal) }}
            </div>
          </div>
          <div>
            <div>Investasi Awal</div>
            <div>Rp {{ form.calculateData?.deposito_investasi_awal }}</div>
          </div>
        </div>
        <div class="grid grid-cols-2 mb-4 text-xs">
          <div>
            <div>Waktu Pencairan</div>
            <div>{{ form.calculateData?.waktu_pencairan }}</div>
          </div>
          <div>
            <div>Waktu Pencairan</div>
            <div>{{ form.calculateData?.deposito_waktu_pencairan }}</div>
          </div>
        </div>
        <button
          class="w-full p-4 rounded bg-red-600 font-semibold text-white mt-4"
          @click="goto(detailProduct?.URL_WEB)"
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
      class="lg:grow shrink lg:pt-24 md:pt-0 absolute left-5 right-0 top-72"
      :calc-invest="arrInvest"
      :calc-deposito="arrDeposito"
      :calc-saving="arrSaving"
      :duration="duration"
    />
  </div>
</template>

<script>
import ProductCalcV2 from "@/components/ProductCalcV2.vue";
import axios from "axios";
import moment from "moment";

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
  name: "InvestmentPlan",
  components: {
    ProductCalcV2,
  },
  mounted() {
    this.getData();
  },
  computed: {
    todayDate() {
      return `${moment().format("YYYY-MM-DD")}`;
    },
    selectedDate() {
      return `${moment()
        .add(this.form.periodInvest * 12, "M")
        .format("YYYY-MM-DD")}`;
    },
  },
  data() {
    return {
      product: {},
      productInvest: PRODUCT_INVEST,
      investAmount: null,
      arrInvest: [],
      arrSaving: [],
      arrDeposito: [],
      investValue: null,
      monthlyValue: null,
      periodInvest: [1, 3, 5],
      form: {
        initialDisplay: null,
        initialFund: null,
        duration: 0,
        product: null,
        outputTotal: 0,
        periodInvest: 1,
        startDate: null,
        endDate: null,
        calculateData: {},
      },
      detailProduct: {},
      isIdle: true,
      isLoading: false,
      duration: 12,
    };
  },
  methods: {
    formatDecimals(value) {
      var num = parseInt(value);
      var str = num.toLocaleString("en-US");
      str = str.replace(/,/g, ".");
      return str;
    },
    numberOnly(evt) {
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault();
      }
    },
    convertInitial(state) {
      if (state) {
        console.log(state);
        if (this.form.initialDisplay === "") {
          return;
        }
        this.form.initialDisplay = this.form.initialFund;
      } else {
        if (this.form.initialDisplay === "") {
          return;
        }
        const str = this.form.initialFund
          .toLocaleString("en-US")
          .replace(/,/g, ".");
        this.form.initialDisplay = str;
      }
    },
    checkFund() {
      if (this.form.initialDisplay < 0) {
        this.form.initialDisplay = null;
      }

      const amount = this.form.initialDisplay.toString();
      this.form.initialDisplay = amount;
      console.log(amount);
      console.log(parseInt(amount));
      if (amount[0] === "0") {
        console.log("detect 0 front");
        amount.slice(1);
        this.form.initialDisplay = parseInt(amount).toLocaleString("en-US");
        this.form.initialFund = parseInt(amount);
      }

      console.log(amount.toLocaleString("en-US"));
      if(this.form.initialDisplay === ''){
        return
      }
      this.form.initialDisplay = parseInt(amount).toLocaleString("en-US");
      this.form.initialFund = parseInt(amount);
    },
    selectPeriod(ev) {
      this.form.periodInvest = ev.target.value;
    },
    getData() {
      let url = "https://bsim.siminvest.co.id/api/v1/pcs/products/fund";
      if (process.env.NODE_ENV === "production") {
        url = window.location.origin + "/api/products";
      } else {
        url = "https://bsim.siminvest.co.id/api/v1/pcs/products/fund";
      }
      axios
        .get(url, {
          headers: {
            Authorization: "Basic YnNpbS1zdGc6YnNpbXN0Zw==",
          },
        })
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          this.productInvest = data;
          this.form.product = this.productInvest[0];
          console.log(this.productInvest);
          console.log(this.form);
        })
        .catch((error) => {
          console.error(error);
          this.form.product = this.productInvest[0];
        })
        .finally(() => {});

      // OLD DATAS
      // const url = "http://trading.simasnet.com/ROL/web/nab.php";
      // axios
      //   .get(url)
      //   .then((res) => {
      //     const data = res.data.results;
      //     console.log(data);
      //     this.productInvest = data;
      //     this.form.product = this.productInvest[0];
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   })
      //   .finally(() => {});
    },
    async calculateInvest() {
      if (this.form.initialDisplay <= 0) {
        return;
      }

      const config = {
        headers: {
          Authorization: "simasBearer",
          Accept: "*/*",
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };

      this.isLoading = true;
      const url = "https://api.siminvest.co.id/api/v1/pcs/calculator";
      let req = {
        installment: this.form.initialDisplay.toString(),
        duration: (this.form.periodInvest * 12).toString(),
        product_id: this.form.product?.code,
      };
      const data = axios
        .post(url, req, config)
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            this.calculateData = res.data.result;
            this.form.calculateData = res.data;
            this.form.outputTotal = res.data.result;
          }

          console.log(this.form);
          this.getProductData();
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response.data);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getProductData() {
      let url = "http://trading.simasnet.com/ROL/web/nab.php";

      if (process.env.NODE_ENV === "production") {
        url = window.location.origin + "/api/nab";
      } else {
        url = "http://trading.simasnet.com/ROL/web/nab.php";
      }
      axios
        .get(url)
        .then((res) => {
          const data = res.data.results;
          console.log(data);
          console.log(this.form.product);
          const filtered = data.filter(
            (el) => el.product_id === this.form.product?.code
          );
          this.detailProduct = filtered[0];
          this.getChartData(this.form.product?.code);
          this.isIdle = false;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    getChartData(id) {
      this.isLoading = true;
      const start = moment(this.todayDate).format("MM/DD/YYYY");
      const end = moment(this.selectedDate).format("MM/DD/YYYY");
      console.log(start, end);
      const url = `http://trading.simasnet.com/ROL/web/nab_range.php?product_id=${id}&start_date=${end}&end_date=${start}`;
      // axios
      //   .get(url)
      //   .then((res) => {
      //     console.log(res);
      //     const data = res.data.results;
      //     console.log(data);

      //     this.data = data;
      //     const navValue = this.data.map((el) => el.nab);
      //     const dataDates = this.calculateStockDates(this.data);
      //     console.log(navValue);
      //     console.log(dataDates);
      //     // this.chartData.datasets[0].data = navValue;
      //     // this.chartData.labels = dataDates;
      //     this.isIdle = false;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   })
      //   .finally(() => {
      //     this.isLoading = false;
      //   });

      this.arrInvest = [];
      this.arrDeposito = [];
      // this.arrSaving = [];
      let inv = 0;
      let depo = 0;
      // let saving = 0;
      inv = this.form.initialFund;
      depo = this.form.initialFund;
      // saving = this.form.initialFund;

      this.arrInvest.push(inv);
      this.arrDeposito.push(depo);
      // this.arrSaving.push(saving);

      let monthly = 12;
      this.duration = this.form.periodInvest * 12;
      console.log("detailProduct");
      console.log(this.detailProduct);

      for (let i = 1; i < this.duration; i++) {
        // inv = inv + (this.form.initialFund + this.detailProduct?.nab);
        inv =
          inv +
          parseInt(
            (
              (this.form.initialFund + this.detailProduct?.nab) *
              Math.pow(1 + 13 / 100 / 12, i)
            ).toFixed(0)
          );
        depo = depo + this.form.initialFund;
        // saving =
        //   saving +
        //   this.form.initialFund  * Math.pow(1 + 0 / 100 / 12, 12 * i) * monthly;

        this.arrInvest.push(inv);
        this.arrDeposito.push(depo);
        // this.arrSaving.push(saving);
      }
    },
    calculateStockDates(timeResults) {
      const dates = [];
      timeResults.forEach((el) => {
        const date = new Date(el.nab_date);
        const momentDate = moment(new Date(el.nab_date)).format("MMM DD YY");
        dates.push(`${momentDate}`);
      });
      return dates;
    },
    selectChange(ev) {
      console.log(ev.target.value);
      this.form.productName = ev.target.value;
      const product = this.productInvest.filter(
        (el) => el.name === this.form.productName
      );
      this.form.product = product[0];

      console.log(this.form);
    },
    goto(url) {
      window.open(url, "_blank");
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
