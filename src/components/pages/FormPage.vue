<template>
  <div style="max-width: 720px" class="mx-auto mt-6">
    <div
      class="flex justify-between border px-5 py-4 mb-6 rounded"
      style="border-color: #eeeeee; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16)"
    >
      <div
        class="px-5 py-2 text-sm rounded-full font-bold cursor-pointer"
        @click="selectTabs(0)"
        :class="{
          'border bg-slate-50': tabsState === 0,
          'text-slate-500': tabsState !== 0,
        }"
      >
        Dana Anda Saat ini
      </div>
      <div
        class="px-5 py-2 text-sm rounded-full font-bold text-slate-500 cursor-pointer"
        @click="selectTabs(1)"
        :class="{
          'border bg-slate-50': tabsState === 1,
          'text-slate-500': tabsState !== 1,
        }"
      >
        Dana yang harus disiapkan
      </div>
      <div
        class="px-5 py-2 text-sm rounded-full font-bold text-slate-500 cursor-pointer"
        @click="selectTabs(2)"
        :class="{
          'border bg-slate-50': tabsState === 2,
          'text-slate-500': tabsState !== 2,
        }"
      >
        Investasi Berkala
      </div>
    </div>

    <!-- Idle State -->
    <div
      style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16); border-radius: 16px"
      class="p-6"
      v-if="isIdle"
    >
      <!-- Current Fund -->
      <div v-if="tabsState === 0">
        <div class="mb-6">
          <div class="font-bold mb-3">Dana anda saat ini</div>
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
              class="px-3 py-2 border-t border-l rounded-l border-b shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
              placeholder="Masukan jangka waktu investasi"
              @change="checkDuration()"
              v-model="form.duration"
            />
            <div
              class="border-t border-r rounded-r border-b border-slate-300 px-3 py-2 sm:text-sm font-bold"
            >
              Tahun
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-3">Profil Resiko</div>
          <select
            class="px-3 py-2 bg-white border shadow-sm rounded border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
            @change="selectChange($event)"
          >
            <option
              class="mb-6"
              :value="invest.code"
              v-for="(invest, index) in riskProfile"
              :key="index"
              @click="selectProduct(invest)"
            >
              {{ invest.name }}
            </option>
          </select>
        </div>
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
      </div>

      <!-- Targeted Fund -->
      <div v-if="tabsState === 1">
        <div class="mb-6">
          <div class="font-bold mb-3">
            Nilai yang ingin saya capai di masa datang
          </div>
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
              class="px-3 py-2 border-t border-l rounded-l border-b shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
              placeholder="Masukan jangka waktu investasi"
              @change="checkDuration()"
              v-model="form.duration"
            />
            <div
              class="border-t border-r rounded-r border-b border-slate-300 px-3 py-2 sm:text-sm font-bold"
            >
              Tahun
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-3">Profil Resiko</div>
          <select
            class="px-3 py-2 bg-white border shadow-sm rounded border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
            @change="selectChange($event)"
          >
            <option
              class="mb-6"
              :value="invest.code"
              v-for="(invest, index) in riskProfile"
              :key="index"
              @click="selectProduct(invest)"
            >
              {{ invest.name }}
            </option>
          </select>
        </div>
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
      </div>

      <!-- Scale Fund -->
      <div v-if="tabsState === 2">
        <div class="mb-6">
          <div class="font-bold mb-3">Dana investasi bulanan saat ini</div>
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
              class="px-3 py-2 border-t border-l rounded-l border-b shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
              placeholder="Masukan jangka waktu investasi"
              @change="checkDuration()"
              v-model="form.duration"
            />
            <div
              class="border-t border-r rounded-r border-b border-slate-300 px-3 py-2 sm:text-sm font-bold"
            >
              Tahun
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="font-semibold mb-3">Profil Resiko</div>
          <select
            class="px-3 py-2 bg-white border shadow-sm rounded border-slate-300 placeholder-slate-400 focus:outline-none block w-full sm:text-sm"
            @change="selectChange($event)"
          >
            <option
              class="mb-6"
              :value="invest.code"
              v-for="(invest, index) in riskProfile"
              :key="index"
              @click="selectProduct(invest)"
            >
              {{ invest.name }}
            </option>
          </select>
        </div>
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

        <div class="flex justify-between mb-6">
          <div class="font-semibold text-sm">Dana Anda saat ini</div>
          <div class="font-bold">
            {{ formatDecimals(form.initialFund) }} IDR
          </div>
        </div>

        <div class="flex justify-between mb-6">
          <div class="font-semibold text-sm">Jangka waktu investasi</div>
          <div class="font-bold">{{ form.duration }} Tahun</div>
        </div>

        <div class="flex justify-between mb-6">
          <div class="font-semibold text-sm">Profil Risiko</div>
          <div class="font-bold">{{ form.productName }}</div>
        </div>
      </div>

      <div class="flex justify-between mb-6 bg-zinc-100 px-6 py-5">
        <div class="font-bold">Nilai investasi Masa Depan (Rupiah)</div>
        <div class="font-bold text-red-600">
          {{ formatDecimals(form.outputTotal) }}
        </div>
      </div>

      <div class="px-6 pb-8">
        <div class="font-bold mb-3">Rekomendasi produk investasi</div>
        <div class="text-slate-400 mb-4">
          Berikut merupakan rekomendasi Produk Investasi kami berdasarkan profil
          resiko yang anda pilih:
        </div>

        <section class="mb-8">
          <div
            :style="[
              product.isSelected
                ? { 'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.16)' }
                : { 'box-shadow': 'none' },
            ]"
            :class="[product.isSelected ? 'bg-white' : 'bg-zinc-100']"
            class="flex justify-between px-4 py-3 mb-4 cursor-pointer border rounded-md"
            v-for="(product, index) in productRecommends"
            :key="index"
            @click="selectInvest(index)"
          >
            <div class="flex">
              <div class="mr-4 font-bold text-red-600">0{{ index + 1 }}</div>
              <div class="font-bold">
                {{ product.name }}
              </div>
            </div>
            <img src="@/assets/check.svg" alt="" v-if="product.isSelected" />
          </div>
        </section>

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
            Mulai Investasi !
          </div>
        </div>
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

// Reksa Dana Campuran
// Reksa Dana Pendapatan Tetap
// Reksa Dana Pasar Uang
// Reksa Dana Saham

export default {
  data() {
    return {
      token: "YnNpbS1zdGc6YnNpbXN0Zw==",
      productInvest: PRODUCT_INVEST,
      productRecommends: PRODUCT_RECOMMENDATION,
      outputTotal: 0,
      isLoading: false,
      riskProfile: [
        {
          name: "Reksa Dana Saham",
        },
        {
          name: "Reksa Dana Campuran",
        },
        {
          name: "Reksa Dana Pendapatan Tetap",
        },
        {
          name: "Reksa Dana Pasar Uang",
        },
      ],
      form: {
        initialFund: null,
        duration: null,
        productName: "Danamas Pasti",
        productCode: "005",
        outputTotal: 0,
      },
      isIdle: true,
      tabsState: 0,
      products:{
        saham: {},
        campuran: {},
        tetap: {},
        pasar: {}
      }
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
  mounted(){
    this.getMutualFunds();
  },
  methods: {
    getMutualFunds() {
      const url = "http://trading.simasnet.com/ROL/web/nab.php";
      axios
        .get(url)
        .then((res) => {
          const data = res.data.results
          this.products.saham = data.filter((el) => el.type_name === 'Reksa Dana Saham')[0]
          this.products.campuran = data.filter((el) => el.type_name === 'Reksa Dana Campuran')[0]
          this.products.tetap = data.filter((el) => el.type_name === 'Reksa Dana Pendapatan Tetap')[0]
          this.products.pasar = data.filter((el) => el.type_name === 'Reksa Dana Pasar Uang')[0]
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    selectChange(ev) {
      if(ev?.name.includes("Campuran")){
        this.form.product = this.product.campuran
      }
      this.form.productCode = ev.target.value;
      const product = this.productInvest.filter(
        (el) => el.code === this.form.productCode
      );
      this.form.productName = product[0].name;

      console.log(this.form);
    },
    selectProduct(invest) {
      this.form.productName = invest?.name;
      console.log(this.form);
    },
    selectInvest(index) {
      const tempArray = [];
      for (let i = 0; i < this.productRecommends.length; i++) {
        const element = this.productRecommends[i];
        if (element.isSelected) {
          element.isSelected = false;
        } else {
          if (index === i) {
            element.isSelected = true;
          }
        }

        tempArray.push(element);
      }

      this.productRecommends = tempArray;
    },
    checkFund() {
      if (this.form.initialFund < 0) {
        this.form.initialFund = null;
      }

      const amount = this.form.initialFund.toString();
      this.form.initialFund = amount
      console.log(amount)
      console.log(parseInt(amount))
      if(amount[0] === '0'){
        console.log('detect 0 front');
        amount.slice(1)
        this.form.initialFund = parseInt(amount)
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
    formatDecimals(num) {
      var str = num.toLocaleString("en-US");
      str = str.replace(/,/g, ".");
      return str;
    },
    resetForm() {
      this.form.initialFund = null;
      this.form.duration = null;
      this.form.outputTotal = null;
      this.isIdle = true;
      this.selectInvest(0);
    },
    selectTabs(index) {
      this.tabsState = index;
      this.resetForm();
    },
    calculateInvest() {
      if (this.form.initialFund <= 0 || this.form.duration <= 0) {
        return;
      }

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
          if (res.data.result) {
            this.form.outputTotal = res.data.result;
          }
          if (res.result) {
            this.form.outputTotal = res.result;
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isIdle = false;
          this.isLoading = false;
          console.log(this.form);
        });
    },
  },
};
</script>

<style></style>
