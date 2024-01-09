<template>
  <div>
    <div class="hidden mb-16 py-10 text-3xl border-b-2 border-amber-300">
      {{ product.product_name ? product.product_name : "-" }}
    </div>
    <div class="border-b pb-8">
      <div class="flex items-center mb-6">
        <div class="text-black tracking-wide font-semibold mr-3">
          LATEST PERFORMANCE (%)
        </div>
        <div style="width: 160px; height: 1px; background-color: black"></div>
      </div>
      <div class="flex items-center">
        <div class="font-bold text-5xl text-black mr-2">
          {{ this.detail?.five_year }}%
        </div>
        <div class="text-sm font-semibold text-gray-400">
          {{ product?.product_name }} <br />Performance 5Y
        </div>
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-between mb-8 pt-8">
      <div class="flex flex-wrap">
        <div
          class="font-bold text-4xl mr-3 md:mb-0 mb-4"
          style="color: #4d995c"
        >
          <span v-if="!isDolar(product)">Rp.</span>
          <span v-if="isDolar(product)">USD</span>
          {{
            product?.nab
              ? product.nab.toLocaleString(undefined, {
                  minimumFractionDigits: 4,
                })
              : "-"
          }}
          <!-- 1,675.0234 - Placeholder hardcoded -->
        </div>
        <div class="text-gray-600 text-base mr-3 mb-4 md:mb-0">
          <div class="font-bold text-black">Kinerja Harian</div>
          <div class="font-medium text-black flex">
            <!-- {{ dayValue?.dayValue ? dayValue.dayValue : '-' }} -->
            <div>({{ productDaily?.dayValue.toFixed(2) }})</div>
            <div
              class="ml-2"
              :class="{
                'text-green-600': productDaily?.dayPercentage > 0,
                'text-rose-600': productDaily?.dayPercentage < 0,
              }"
            >
              {{ productDaily?.dayPercentage.toFixed(2) }}%
              <span v-if="productDaily?.dayPercentage > 0">▲</span>
              <span v-if="productDaily?.dayPercentage < 0">▼</span>
            </div>
            <!-- Jumat, 17 November 2023 - Placeholder hardcoded -->
          </div>
        </div>
      </div>
      <div class="text-gray-600 text-base">
        <div class="font-bold text-black">NAB/Unit</div>
        <div class="font-semibold text-black">
          {{ formatDate(product?.nab_date) }}
          <!-- Jumat, 17 November 2023 - Placeholder hardcoded -->
        </div>
      </div>
    </div>
    <div
      class="flex justify-between bg-zinc-100 flex-wrap md:flex-no-wrap mb-8"
    >
      <div class="basis-1/2 md:basis-auto grow shrink">
        <div
          class="py-2 px-6 text-center border-r border-neutral-400 font-bold"
          style="background-color: #e6e6e6"
        >
          1 Month
        </div>
        <div
          class="py-2 px-6 text-center bg-zinc-100 border-r border-t border-neutral-400"
        >
          {{ product.return_one_month > 0 ? "+" : "" }}
          {{ displayReturn(product.return_one_month) }}%
        </div>
      </div>
      <div class="basis-1/2 md:basis-auto grow shrink">
        <div
          class="py-2 px-6 text-center border-r border-neutral-400 font-bold"
          style="background-color: #e6e6e6"
        >
          3 Months
        </div>
        <div
          class="py-2 px-6 text-center bg-zinc-100 border-r border-t border-neutral-400"
        >
          {{ product.return_three_month > 0 ? "+" : "" }}
          {{ displayReturn(product.return_three_month) }}%
        </div>
      </div>
      <div class="basis-1/2 md:basis-auto grow shrink">
        <div
          class="py-2 px-6 text-center border-r border-neutral-400 font-bold"
          style="background-color: #e6e6e6"
        >
          6 Months
        </div>
        <div
          class="py-2 px-6 text-center bg-zinc-100 border-r border-t border-neutral-400"
        >
          {{ product.return_six_month > 0 ? "+" : "" }}
          {{ displayReturn(product.return_six_month) }}%
        </div>
      </div>
      <div class="basis-1/2 md:basis-auto grow shrink">
        <div
          class="py-2 px-6 text-center border-r border-neutral-400 font-bold"
          style="background-color: #e6e6e6"
        >
          Year To Date
        </div>
        <div
          class="py-2 px-6 text-center bg-zinc-100 border-r border-t border-neutral-400"
        >
          {{ product.return_year_to_date > 0 ? "+" : "" }}
          {{ displayReturn(product.return_year_to_date) }}%
        </div>
      </div>
      <div class="basis-1/2 md:basis-auto grow shrink">
        <div
          class="py-2 px-6 text-center border-r border-neutral-400 font-bold"
          style="background-color: #e6e6e6"
        >
          1 Year
        </div>
        <div
          class="py-2 px-6 text-center bg-zinc-100 border-r border-t border-neutral-400"
        >
          {{ product.return_one_year > 0 ? "+" : "" }}
          {{ displayReturn(product.return_one_year) }}%
        </div>
      </div>
      <div class="basis-1/2 md:basis-auto grow shrink">
        <div
          class="py-2 px-6 text-center border-r border-neutral-400 font-bold"
          style="background-color: #e6e6e6"
        >
          3 Year
        </div>
        <div
          class="py-2 px-6 text-center bg-zinc-100 border-r border-t border-neutral-400"
        >
          {{ product.return_three_year > 0 ? "+" : "" }}
          {{ displayReturn(product.return_three_year) }}%
        </div>
      </div>
      <div class="basis-1/2 md:basis-auto grow shrink">
        <div
          class="py-2 px-6 text-center font-bold"
          style="background-color: #e6e6e6"
        >
          5 Year
        </div>
        <div
          class="py-2 px-6 text-center bg-zinc-100 border-t border-neutral-400"
        >
          {{ product.return_five_year > 0 ? "+" : "" }}
          {{ displayReturn(product.return_five_year) }}%
        </div>
      </div>
    </div>
    <!-- <ChartV2 :chartValue="data" :productCode="'005'" /> -->
    <ChartV3
      :chartValue="data"
      :productCode="'005'"
      :showRisk="false"
      @day-percentage="getDayPercentage($event)"
    />
    <div
      class="border-y py-6 flex flex-wrap md:flex-no-wrap justify-between mt-8"
    >
      <div
        class="basis-full md:basis-auto grow flex flex-wrap items-center border-b border-gray-200 md:border-b-0"
        style="height: 220px"
      >
        <div class="p-10 grow basis-full text-center md:text-left text-black">
          <div class="font-bold text-3xl mb-4">
            Product Info <br />
            Documents
          </div>
          <div class="font-medium">
            Your Investment <br />
            Documents Here
            <img src="@/assets/arrow-right.svg" class="inline-block" alt="" />
          </div>
        </div>
      </div>
      <div
        class="grow border-r border-l border-gray-200 px-8 py-6 text-center border-b md:border-b-0"
      >
        <div class="border border-black rounded-full inline-block p-4">
          <img
            src="@/assets/file-text-15.svg"
            class="inline-block w-20"
            alt=""
            style="width: 56px; height: 100%"
          />
        </div>
        <div class="my-3 font-bold text-xl text-black">Prospektus</div>
        <button
          class="border border-black px-6 py-2 flex items-center justify-center mx-auto"
          @click="goto(detail?.propectus)"
        >
          <div class="font-semibold mr-2">Download</div>
          <img src="@/assets/download.svg" class="inline-block" alt="" />
        </button>
      </div>
      <div class="grow px-8 py-6 text-center">
        <div class="border border-black rounded-full inline-block p-4">
          <img
            src="@/assets/file-text-15.svg"
            class="inline-block w-20"
            alt=""
            style="width: 56px; height: 100%"
          />
        </div>
        <div class="my-3 font-bold text-xl text-black">Factsheet</div>
        <button
          class="border border-black px-6 py-2 flex items-center justify-center mx-auto"
          @click="goto(detail?.ffs_url)"
        >
          <div class="font-semibold mr-2">Download</div>
          <img src="@/assets/download.svg" class="inline-block" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ChartV3 from "@/components/ChartV3.vue";
import moment from "moment";

const example = [
  {
    aum: 36126294502.66,
    nav: 1173.8299,
    code: "108",
    nav_datetime: "2023-03-31T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36170799493.82,
    nav: 1176.5419,
    code: "108",
    nav_datetime: "2023-03-30T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36407182279.11,
    nav: 1184.2308,
    code: "108",
    nav_datetime: "2023-03-29T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35980985905.36,
    nav: 1170.2118,
    code: "108",
    nav_datetime: "2023-03-28T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35624183859.02,
    nav: 1158.653,
    code: "108",
    nav_datetime: "2023-03-27T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35797885406.69,
    nav: 1165.9287,
    code: "108",
    nav_datetime: "2023-03-24T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35298169675.25,
    nav: 1149.5702,
    code: "108",
    nav_datetime: "2023-03-21T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 34812294013.79,
    nav: 1133.6916,
    code: "108",
    nav_datetime: "2023-03-20T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35113026090.14,
    nav: 1143.4452,
    code: "108",
    nav_datetime: "2023-03-17T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 34577294442.55,
    nav: 1125.0422,
    code: "108",
    nav_datetime: "2023-03-16T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 34805451266.49,
    nav: 1132.1239,
    code: "108",
    nav_datetime: "2023-03-15T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35004289979.46,
    nav: 1138.5288,
    code: "108",
    nav_datetime: "2023-03-14T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35749168338.48,
    nav: 1162.0809,
    code: "108",
    nav_datetime: "2023-03-13T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35699677705.5,
    nav: 1160.2016,
    code: "108",
    nav_datetime: "2023-03-10T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35935672503.5,
    nav: 1167.7503,
    code: "108",
    nav_datetime: "2023-03-09T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35794109897.38,
    nav: 1162.8881,
    code: "108",
    nav_datetime: "2023-03-08T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35731496279.8,
    nav: 1160.7263,
    code: "108",
    nav_datetime: "2023-03-07T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35809872537.61,
    nav: 1163.895,
    code: "108",
    nav_datetime: "2023-03-06T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35838549361.43,
    nav: 1164.7846,
    code: "108",
    nav_datetime: "2023-03-03T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36136320049.92,
    nav: 1174.5127,
    code: "108",
    nav_datetime: "2023-03-02T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36096568040.19,
    nav: 1173.2639,
    code: "108",
    nav_datetime: "2023-03-01T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36021631135.06,
    nav: 1170.8347,
    code: "108",
    nav_datetime: "2023-02-28T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36183450815.39,
    nav: 1176.0922,
    code: "108",
    nav_datetime: "2023-02-27T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36277040635.59,
    nav: 1179.0472,
    code: "108",
    nav_datetime: "2023-02-24T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36246435416.07,
    nav: 1177.6903,
    code: "108",
    nav_datetime: "2023-02-23T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36082660827.36,
    nav: 1172.3396,
    code: "108",
    nav_datetime: "2023-02-22T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36533688745.9,
    nav: 1187.0425,
    code: "108",
    nav_datetime: "2023-02-21T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36622062493.02,
    nav: 1190.1639,
    code: "108",
    nav_datetime: "2023-02-20T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36512759847.39,
    nav: 1187.2786,
    code: "108",
    nav_datetime: "2023-02-17T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36473695816.34,
    nav: 1186.2393,
    code: "108",
    nav_datetime: "2023-02-16T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36637783691.65,
    nav: 1191.4665,
    code: "108",
    nav_datetime: "2023-02-15T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36722997508.71,
    nav: 1191.1844,
    code: "108",
    nav_datetime: "2023-02-14T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36499403039.04,
    nav: 1184.4739,
    code: "108",
    nav_datetime: "2023-02-13T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36506911325.48,
    nav: 1184.346,
    code: "108",
    nav_datetime: "2023-02-10T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36335930266.26,
    nav: 1178.797,
    code: "108",
    nav_datetime: "2023-02-09T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36542269545.96,
    nav: 1185.6311,
    code: "108",
    nav_datetime: "2023-02-08T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36442577542.12,
    nav: 1182.5646,
    code: "108",
    nav_datetime: "2023-02-07T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36215065701.67,
    nav: 1174.5458,
    code: "108",
    nav_datetime: "2023-02-06T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36397793829.98,
    nav: 1180.3875,
    code: "108",
    nav_datetime: "2023-02-03T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36067966512.25,
    nav: 1169.7268,
    code: "108",
    nav_datetime: "2023-02-02T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36906520898.33,
    nav: 1168.6107,
    code: "108",
    nav_datetime: "2023-02-01T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36731933757.44,
    nav: 1163.0888,
    code: "108",
    nav_datetime: "2023-01-31T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 37022934958.96,
    nav: 1171.946,
    code: "108",
    nav_datetime: "2023-01-30T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 37121118731.22,
    nav: 1174.8862,
    code: "108",
    nav_datetime: "2023-01-27T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36959559844.33,
    nav: 1169.6938,
    code: "108",
    nav_datetime: "2023-01-26T00:00:00Z",
    one_month: 0,
    year_to_date: 0.63,
  },
  {
    aum: 36614381412.11,
    nav: 1158.6783,
    code: "108",
    nav_datetime: "2023-01-25T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36861992259.42,
    nav: 1167.1003,
    code: "108",
    nav_datetime: "2023-01-24T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36960663003.12,
    nav: 1170.2149,
    code: "108",
    nav_datetime: "2023-01-20T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36839586713.19,
    nav: 1166.0482,
    code: "108",
    nav_datetime: "2023-01-19T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36575616579.99,
    nav: 1157.6916,
    code: "108",
    nav_datetime: "2023-01-18T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36612704537.39,
    nav: 1158.859,
    code: "108",
    nav_datetime: "2023-01-17T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36198167435.46,
    nav: 1143.0404,
    code: "108",
    nav_datetime: "2023-01-16T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35954186073.13,
    nav: 1134.5076,
    code: "108",
    nav_datetime: "2023-01-13T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35975165545.75,
    nav: 1136.7692,
    code: "108",
    nav_datetime: "2023-01-12T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35654058783.99,
    nav: 1126.6382,
    code: "108",
    nav_datetime: "2023-01-11T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 35818692412.9,
    nav: 1131.9811,
    code: "108",
    nav_datetime: "2023-01-10T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36334222419.31,
    nav: 1147.6489,
    code: "108",
    nav_datetime: "2023-01-09T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36206183385.81,
    nav: 1143.4597,
    code: "108",
    nav_datetime: "2023-01-06T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36068816956.37,
    nav: 1139.3663,
    code: "108",
    nav_datetime: "2023-01-05T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36734514740.77,
    nav: 1160.5528,
    code: "108",
    nav_datetime: "2023-01-04T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 37097510687,
    nav: 1171.7483,
    code: "108",
    nav_datetime: "2023-01-03T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36727005179.21,
    nav: 1160.0867,
    code: "108",
    nav_datetime: "2023-01-02T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
  {
    aum: 36797223277.16,
    nav: 1162.3175,
    code: "108",
    nav_datetime: "2022-12-30T00:00:00Z",
    one_month: 0,
    year_to_date: 0,
  },
];

export default {
  components: {
    ChartV3,
  },
  data() {
    return {
      data: example,
      product: {},
      detail: { propectus: "", ffs_url: "" },
      navs: [],
      productName: "",
      routeName: "",
      productDaily: {
        dayValue: 0.0,
        dayPercentage: 0.0,
      },
    };
  },
  computed: {
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
    this.getMutualFunds();
  },
  methods: {
    displayReturn(value) {
      let returnValue = "-";
      if (value) {
        returnValue = value;
      }
      return returnValue;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(4).replace(",", ".");
      return val.toString();
    },
    getMutualFunds() {
      const stgName = localStorage.getItem("urlname");
      const name = stgName;
      this.routeName = stgName;
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
          const rawName = name.split("-");
          let procName = [];
          for (let i = 0; i < rawName.length; i++) {
            procName.push(
              rawName[i].charAt(0).toUpperCase() + rawName[i].slice(1)
            );
          }
          const finalName = procName.join(" ");
          this.productName = finalName;
          this.product = data.filter((el) => el.product_name === finalName)[0];
          this.getProductDetail(this.product?.product_id);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          //  this.formatDate(this.product?.nab_date);
        });
    },
    getProductDetail(id) {
      let url = `https://bsim.siminvest.co.id/api/v1/pcs/product/fund/${id}`;

      if (process.env.NODE_ENV === "production") {
        url = window.location.origin + `/api/detail/${id}`;
      } else {
        url = `https://bsim.siminvest.co.id/api/v1/pcs/product/fund/${id}`;
      }
      const config = {
        headers: {
          Authorization: "Basic YnNpbS1zdGc6YnNpbXN0Zw==",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.detail = res.data.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    goto(url) {
      window.open(url, "_blank").focus();
    },
    formatDate(rawDate) {
      if (rawDate) {
        return moment(rawDate, "DD-MM-YYYY")
          .locale("id")
          .format("dddd, DD MMMM YYYY");
      }
    },
    isDolar(product) {
      if (this.routeName?.toLowerCase()?.includes("dollar")) return true;
      return false;
    },
    getDayPercentage(ev) {
      this.productDaily = ev;
    },
  },
};
</script>

<style></style>
