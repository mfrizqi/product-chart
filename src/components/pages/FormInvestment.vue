<template>
  <div style="max-width: 720px" class="mx-auto mt-6">
    <!-- Idle State -->
    <div
      style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16); border-radius: 16px"
      class="p-6"
      v-if="isIdle"
    >
      <div class="mb-6">
        <div class="font-semibold mb-3">Nama Produk</div>
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
        <div class="font-bold mb-3">Nilai Investasi/Bulan</div>
        <div class="flex items-center">
          <div
            class="border-t border-l rounded-l border-b border-slate-300 px-3 py-2 sm:text-sm font-bold"
            :class="[
              form.initialDisplay === '' || form.initialDisplay === '0'
                ? 'border-rose-500'
                : '',
            ]"
          >
            Rp
          </div>
          <input
            type="text"
            name="text"
            v-model="form.initialDisplay"
            @change="checkFund()"
            class="px-3 py-2 border-t border-r border-b shadow-sm rounded-r border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
            placeholder="Masukan Dana anda saat ini"
            @keypress="numberOnly($event)"
            @focus="convertInitial(true)"
            @blur="convertInitial(false)"
            :class="[
              form.initialDisplay === '' || form.initialDisplay === '0'
                ? 'border-rose-500'
                : '',
            ]"
          />
        </div>
        <div
          v-if="form.initialDisplay === '' || form.initialDisplay === '0'"
          class="text-rose-500 mt-1 px-3 py-2 text-sm flex"
        >
          Nilai Investasi/Bulan tidak boleh kosong
        </div>
      </div>
      <div class="mb-6">
        <div class="font-semibold mb-3">Dalam Kurun Waktu</div>
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
      <!-- <div class="mb-6 hidden">
        <div class="font-semibold mb-3">Tanggal Awal Investasi</div>
        <VueDatePicker
          v-model="form.startDate"
          :min-date="new Date()"
          placeholder="Dd / MMm / YYYY"
          :enable-time-picker="false"
          month-name-format="short"
          :format="formatDate"
          :preview-format="formatDate"
        />
      </div>
      <div class="mb-6 hidden">
        <div class="font-semibold mb-3">Tanggal Akhir Investasi</div>
        <VueDatePicker
          v-model="form.endDate"
          :min-date="new Date()"
          placeholder="Dd / MMm / YYYY"
          :enable-time-picker="false"
          month-name-format="short"
          :format="formatDate"
          :preview-format="formatDate"
        />
      </div> -->
      <div class="flex justify-between">
        <div
          class="rounded-md border border-slate-500 px-4 py-3 font-semibold cursor-pointer"
          @click="resetForm()"
        >
          Reset
        </div>
        <div
          class="rounded-md border px-6 py-3 bg-red-600 text-white font-semibold cursor-pointer tracking-wide flex"
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
          Hitung Keuntungan
        </div>
      </div>

      <div class="mt-6 text-xs">
        <div class="font-semibold mb-3">Disclaimer</div>
        <div>
          Perhitungan kalkulator investasi di atas merupakan alat bantu simulasi
          <br /> dan bukan saran investasi.
        </div>
      </div>
    </div>

    <!-- Calculated State -->
    <div
      style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16); border-radius: 16px"
      v-if="!isIdle"
    >
      <div class="pt-8 px-6">
        <div class="text-center text-xl font-bold mb-6">
          Estimasi Perhitungan
        </div>

        <div class="mb-6">
          <div class="font-bold text-sm mb-2">Produk Investasi</div>
          <div
            class="font-bold px-6 py-4 rounded-lg border"
            style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16)"
          >
            {{ form.product?.name }}
          </div>
        </div>

        <div class="flex justify-between mb-6">
          <div class="font-semibold text-sm">Nilai Investasi/Bulan</div>
          <div class="font-bold">
            {{ formatDecimals(form.initialFund) }} IDR
          </div>
        </div>

        <div class="flex justify-between mb-6">
          <div class="font-semibold text-sm">Dalam Kurun Waktu</div>
          <div class="font-bold">
            {{ form.periodInvest }} Tahun
            <!-- <span v-if="form.periodInvest === 1"> (Satu)</span>
            <span v-if="form.periodInvest === 10"> (Sepuluh)</span>
            <span v-if="form.periodInvest === 20"> (Dua Puluh)</span> -->
          </div>
        </div>

        <div class="flex justify-between mb-6 hidden">
          <div class="font-semibold text-sm">Tanggal Awal Investasi</div>
          <div class="font-bold">{{ form.startDisplay }}</div>
        </div>

        <div class="flex justify-between mb-6 hidden">
          <div class="font-semibold text-sm">Tanggal Akhir Investasi</div>
          <div class="font-bold">{{ form.endDisplay }}</div>
        </div>
      </div>

      <div class="flex justify-between mb-6 bg-zinc-100 px-6 py-5">
        <div class="font-bold">Nilai investasi Masa Depan (Rupiah)</div>
        <div class="font-bold text-red-600">
          {{ formatDecimals(parseInt(form.outputTotal)) }}
        </div>
      </div>

      <div
        class="px-6 pb-4 flex items-center justify-end cursor-pointer hidden"
      >
        <a href="#" class="font-semibold text-red-600 text-sm inline-block">
          Selengkapnya
        </a>
        <img src="@/assets/chevron-right-red.svg" alt="" style="width: 22px" />
      </div>

      <div class="px-6 pb-4">
        <div class="flex justify-between">
          <div
            class="rounded-md border border-slate-500 px-4 py-3 font-semibold cursor-pointer flex"
            @click="resetForm()"
          >
            Hitung ulang
            <img
              src="@/assets/retry.svg"
              style="width: 18px; margin-top: 4px; margin-left: 4px"
            />
          </div>
          <div
            class="rounded-md border px-6 py-3 bg-red-600 text-white font-semibold cursor-pointer tracking-wide flex"
            :disabled="isLoading"
            @click="toProduct()"
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
            Mulai Investasi !
          </div>
        </div>
      </div>

      <div class="p-6 text-xs">
        <div class="font-semibold mb-3">Disclaimer</div>
        <div>
          Perhitungan kalkulator investasi diatas merupakan alat bantu alat
          bantu simulasi dan buka <br />
          merupakan saran investasi.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

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

let PRODUCT_RECOMMENDATION = [
  {
    name: "Danamas Rupiah Plus",
    isSelected: true,
  },
  {
    name: "Danamas Dolar",
    isSelected: false,
  },
  {
    name: "Simas Danamas Instrumen Negara",
    isSelected: false,
  },
  {
    name: "Danamas Pasti",
    isSelected: false,
  },
  {
    name: "Simas Syariah Pendapatan Tetap",
    isSelected: false,
  },
  {
    name: "Simas Syariah Pendapatan Optima",
    isSelected: false,
  },
];

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Max-Age'] = 600;

export default {
  components: {
    // VueDatePicker,
  },
  data() {
    return {
      productInvest: PRODUCT_INVEST,
      productRecommends: PRODUCT_RECOMMENDATION,
      periodInvest: [1, 3, 5],
      outputTotal: 0,
      isLoading: false,
      form: {
        initialDisplay: null,
        initialFund: null,
        duration: 0,
        product: null,
        outputTotal: 0,
        periodInvest: 1,
        startDate: null,
        endDate: null,
      },
      detailProduct: {},
      isIdle: true,
      postInitFund: "500000",
      postDuration: "12",
      postId: "002",
      config: {
        authBearer:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOcEFWMmZ6UVNFRGMyUDB0YjVFTnBnZEc4VDdIZlhsUyJ9.dNq_ZiJSqlhA2Wpl-GDN3Ap5LUtUmiqgXIRta4NsiSo",
      },
    };
  },
  filters: {
    toCurrency: (value) => {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(value);
    },
  },
  mounted() {
    console.log(process.env.NODE_ENV);
    // console.log(import.meta.env.DEV);
    // console.log(import.meta.env.PROD);
    this.getMutualFunds();
  },
  methods: {
    getMutualFunds() {
      let url = "";

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
    selectPeriod(ev) {
      this.form.periodInvest = ev.target.value;
    },
    selectProduct(invest) {
      this.form.productName = invest?.name;
      this.product = invest;
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
      if (this.form.initialDisplay === "") {
        return;
      }
      this.form.initialDisplay = parseInt(amount).toLocaleString("en-US");
      this.form.initialFund = parseInt(amount);
    },
    checkDuration() {
      if (this.form.duration < 0) {
        this.form.duration = 0;
      }

      if (this.form.duration > 50) {
        this.form.duration = 50;
      }
    },
    formatDecimals(num) {
      var str = num.toLocaleString("en-US");
      str = str.replace(/,/g, ".");
      return str;
    },
    formatDate(date) {
      console.log(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    checkDate() {
      const start = moment(this.form.startDate);
      const end = moment(this.form.endDate);
      const startDisplay = moment(this.form.startDate).format("DD MMM YYYY");
      const endDisplay = moment(this.form.endDate).format("DD MMM YYYY");

      this.form.startDisplay = startDisplay;
      this.form.endDisplay = endDisplay;
      return end.diff(start);
    },
    resetForm() {
      this.form.initialFund = null;
      this.form.periodInvest = 1;
      this.form.startDate = null;
      this.form.endDate = null;
      this.form.outputTotal = 0;
      this.isIdle = true;
    },
    async calculateInvest() {
      // const selectedDate = this.checkDate();

      // const start = moment(this.form.startDate);
      // const end = moment(this.form.endDate);
      // const monthDifference = end.diff(start, "months");

      if (
        this.form.initialFund <= 0

        // !this.form.startDate ||
        // !this.form.endDate ||
        // selectedDate <= 0 ||
        // monthDifference === 0
      ) {
        this.form.initialDisplay = "";
        this.form.initialFund = null;
        return;
      }

      const config = {
        headers: {
          Authorization: this.config.authBearer,
          Accept: "*/*",
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };

      this.isLoading = true;
      const url = "https://api.siminvest.co.id/api/v1/pcs/calculator";
      let req = {
        installment: this.form.initialFund.toString(),
        duration: (this.form.periodInvest * 12).toString(),
        product_id: this.form.product?.code,
      };

      // let req = {
      //   installment: "50000",
      //   duration: "12",
      //   product_id: "002",
      // };
      console.log(req);
      const data = axios
        .post(url, req, config)
        .then((res) => {
          console.log(res);
          if (res.data.result) {
            this.form.outputTotal = res.data.result;
          }
          if (res.result) {
            this.form.outputTotal = res.result;
          }

          this.isIdle = false;
          this.isLoading = false;
          console.log(this.form);
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response.data);
          this.isLoading = false;
        });

      console.log(data);
      this.getProductData();
    },
    calculateInvestV2() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "simasBearer");
      myHeaders.append("api_key", "Basic YnNpbS1zdGc6YnNpbXN0Zw==");
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Accept", "*/*",)

      const installment = this.form.initialFund.toString();
      const duration = (this.form.periodInvest * 12).toString();
      const product_id = this.form.product?.product_id;

      console.log(installment, typeof installment);
      console.log("50000000", typeof "50000000");
      console.log(duration, typeof duration);
      console.log("12", typeof "12");
      console.log(product_id, typeof product_id);
      console.log("008", typeof "008");

      var raw = JSON.stringify({
        installment: "5",
        duration: "12",
        product_id: "008",
      });

      var raw2 = JSON.stringify({
        installment: this.postInitFund,
        duration: this.postDuration,
        product_id: this.postId,
      });

      console.log(raw, typeof raw);
      console.log(raw2, typeof raw2);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw2,
        redirect: "follow",
      };

      fetch("https://api.siminvest.co.id/api/v1/pcs/calculator", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
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
          console.log("detailProduct");
          console.log(this.detailProduct);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    toProduct() {
      const name = this.form.product?.name.toLowerCase().replace(/ /g, "-");
      console.log(name);
      // Live URl
      let baseProdUrl = 'http://www.sinarmas-am.co.id/'
      let baseUrl = 'https://sam.admire.id/'
      const url = baseProdUrl + name;
      window.open(url, "_blank");
    },
  },
};
</script>

<style></style>
