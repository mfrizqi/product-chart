<template>
  <div style="min-height: 86px">
    <div
      style="background-color: black; opacity: 0.1"
      class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center"
      v-if="isLoading"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
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
    </div>

    <div v-if="!isLoading">
      <div v-if="errorFetch" class="text-center">
        <img
          src="@/assets/alert-circle.svg"
          class="block mx-auto my-4"
          style="opacity: 0.4"
        />
        <div style="color: #7e848b">Failed to get products</div>
      </div>
      <div></div>
      <div
        v-for="(product, index) in products"
        :key="index"
        class="border-t border-b border-zinc-200 p-6"
        :class="[{ 'border-t': index === 0 }]"
      >
        <div class="mb-4 font-semibold flex justify-between">
          <div class="cursor-pointer shrink grow-0 flex items-center" @click="goto(product?.product_name)">
            {{ displayName(product?.product_name) }} <img src="@/assets/logo/ai.png" v-if="product?.detail?.ai" style="height: 48px; width: 48px;" alt="">
          </div>
          <div class="cursor-pointer grow shrink-0 md:hidden block">
            <div @click="goto(product?.product_name)" class="flex justify-end">
              <div class="font-semibold mr-1">{{ display.seeDetail }}</div>
               <!-- <img
                src="@/assets/arrow-up-right.svg"
                class="block"
              /> -->
              <div class="ic ic-redirect"></div>
            </div>
          </div>
        </div>
        <div class="flex shrink justify-between">
          <div style="min-width: 200px">
            <div class="font-normal text-sm">
              {{display.nav}} {{ formatDate(product?.nab_date) }}
            </div>
            <div class="mt-2 mb-4">
              <span class="font-normal mr-2">{{product?.product_name?.toLowerCase().includes('dollar') ? 'USD' : 'IDR'}}</span>
              <span class="font-medium text-3xl">
                {{
                  formatNAB(product?.nab).toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                  })
                }}
              </span>
            </div>
          </div>
          <div class="md:block hidden">
            <div class="text-sm text-right font-medium">
              {{ display.dailyPerformance }}
            </div>
            <div
              class="font-semibold flex items-center"
              :class="{
                'text-green-600': product?.performance.dayValue > 0,
                'text-rose-600': product?.performance.dayValue < 0,
              }"
            >
              <div
                class="mr-1"
                style="font-size: 10px"
                v-if="product?.performance?.dayPercentage > 0"
              >
                ▲
              </div>
              <div
                class="mr-1"
                style="font-size: 10px"
                v-if="product?.performance?.dayPercentage < 0"
              >
                ▼
              </div>
              {{ product?.performance.dayPercentage.toFixed(2) }} %
            </div>
            <div class="font-semibold">
              (<span v-if="product?.performance.dayValue > 0">+</span
              >{{ product?.performance.dayValue.toFixed(2) }})
            </div>
          </div>
          <div class="md:block hidden">
            <div class="text-sm text-right font-medium">YTD</div>
            <div class="font-semibold">{{ product?.return_year_to_date }}%</div>
          </div>
          <div class="md:block hidden">
            <div class="text-sm text-right font-medium">
              1{{ display.performYearSymbol }}
            </div>
            <div class="font-semibold">{{ product?.return_one_year }}%</div>
          </div>
          <div class="md:block hidden">
            <div class="text-sm text-right font-medium">
              3{{ display.performYearSymbol }}
            </div>
            <div class="font-semibold">{{ product?.return_three_year }}%</div>
          </div>
          <div class="md:block hidden">
            <div class="text-sm text-right font-medium">
              5{{ display.performYearSymbol }}
            </div>
            <div class="font-semibold">{{ product?.return_five_year }}%</div>
          </div>
          <div class="cursor-pointer md:block hidden detail-text">
            <div @click="goto(product?.product_name)" class="flex">

              <span class="font-semibold mr-2">{{ display.seeDetail }}</span>
              <!-- <img
                src="@/assets/arrow-up-right.svg"
                class="inline-block"
                alt=""
              /> -->
              <div class="ic ic-redirect"></div>
            </div>
          </div>
        </div>
        <div class="md:hidden block my-2">
          <div class="text-sm font-medium">
            {{ display.dailyPerformance }}
          </div>
          <div class="font-semibold flex items-center">
            <div
              class="mr-1"
              style="font-size: 10px"
              v-if="product?.performance?.dayPercentage > 0"
              :class="{
                'text-green-600': isDayValueUp(product),
              }"
            >
              ▲
            </div>
            <div
              class="mr-1"
              style="font-size: 10px"
              v-if="product?.performance?.dayPercentage < 0"
              :class="{
                'text-rose-600': !isDayValueUp(product),
              }"
            >
              ▼
            </div>
            <div
              :class="{
                'text-green-600': isDayValueUp(product),
                'text-rose-600': !isDayValueUp(product),
              }"
            >
              {{ product?.performance.dayPercentage.toFixed(2) }} %
            </div>

            <div class="ml-1 font-semibold">
              (<span v-if="product?.performance.dayValue > 0">+</span
              >{{ product?.performance.dayValue.toFixed(2) }})
            </div>
          </div>
        </div>
        <div class="flex justify-between py-2">
          <div class="md:hidden block">
            <div class="text-sm text-right font-medium">YTD</div>
            <div class="font-semibold">{{ product?.return_year_to_date }}%</div>
          </div>
          <div class="md:hidden block">
            <div class="text-sm text-right font-medium">1Y</div>
            <div class="font-semibold">{{ product?.return_one_year }}%</div>
          </div>
          <div class="md:hidden block">
            <div class="text-sm text-right font-medium">3Y</div>
            <div class="font-semibold">{{ product?.return_three_year }}%</div>
          </div>
          <div class="md:hidden block">
            <div class="text-sm text-right font-medium">5Y</div>
            <div class="font-semibold">{{ product?.return_five_year }}%</div>
          </div>
        </div>
        <div class="mt-2">
          <span class="font-normal">{{ display.riskProfile }}: </span>
          <span class="font-bold" v-if="product?.rating">{{
            product?.ratingText
          }}</span>
          <span class="font-bold" v-if="!product?.rating">{{ "-" }}</span>
        </div>
      </div>
    </div>

    <!-- 
      Old Version
    -->

    <!-- <section>
      <div
        class="px-4 py-4 flex items-center justify-between border rounded-lg bg-red-500 mt-4"
      >
        <div class="ml-2 mr-10 font-bold text-white">No</div>
        <div class="flex-1 text-center font-bold text-white">Nama Produk</div>
        <div class="flex-1 text-center font-bold text-white">Profil Risiko</div>
        <div class="flex-1 text-center font-bold text-white">NAB/Unit</div>
        <div class="flex-1 text-center font-bold text-white">YTD</div>
        <div class="px-6"></div>
      </div>
      <div
        v-for="(product, index) in products"
        :key="index"
        class="px-4 py-4 flex items-center justify-between border rounded-lg bg-neutral-100 hover:bg-white product"
      >
        <div class="ml-2 mr-10 font-bold text-red-500">{{ index + 1 }}</div>
        <div class="flex-1 text-center font-bold">{{ product.product_name }}</div>
        <div class="flex-1 text-center text-sm">
          <span
            class="font-bold"
            v-if="product.rating"
            :class="product.ratingColor"
            >{{ product?.ratingText }}</span
          >
          <span class="font-bold" v-if="!product.rating">{{ "-" }}</span>
        </div>
        <div class="flex-1 text-center text-sm">
          <span class="text-green-600 font-bold">Rp. {{ product.nab }}</span>
        </div>
        <div class="flex-1 text-center text-sm mr-6">
          <span class="text-green-600 font-bold"
            >{{ product.return_year_to_date }}%</span
          >
        </div>
        <div @click="goto(product.product_name)" class="cursor-pointer">
          <img src="@/assets/arrow-up-right.svg" alt="" />
        </div>
      </div>
    </section> -->
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      productPerform: {},
      errorFetch: false,
      language: "",
      display: {
        dailyPerformance: "Daily Performance",
        riskProfile: "Risk Profile",
        riskProfileValue: ["Conservative", "Moderate", "Aggresive"],
        seeDetail: "See Detail",
        performYearSymbol: "Y",
        nav: "NAV"
      },
      lang: {
        dailyPerformance: {
          id: "Kinerja Harian",
          en: "Daily Performance",
        },
        riskProfile: {
          id: "Profil Risiko",
          en: "Risk Profile",
        },
        riskProfileValue: {
          // id: ["Rendah", "Menengah", "Tinggi"],
          // en: ["Low", "Medium", "High"],
          id: ["Konservatif", "Moderat", "Agresif"],
          en: ["Conservative", "Moderate", "Aggresive"],
        },
        performYearSymbol: {
          id: "T",
          en: "Y",
        },
        seeDetail: {
          id: "Lihat Detail",
          en: "See Detail",
        },
        nav: {
          id: "NAB",
          en: "NAV"
        }
      },
    };
  },
  mounted() {
    // console.log(this.$route.params.lang);
    if (this.$route?.params?.lang) {
      this.language = this.$route.params.lang;
    }
    // console.log(this.$route.params.type);
    this.setLang();
    this.getMutualFunds();
  },
  computed: {
    todayDate() {
      return `${moment().format("YYYY-MM-DD")}`;
    },
    selectedDate() {
      return `${moment().subtract(1, "months").format("YYYY-MM-DD")}`;
    },
  },
  methods: {
    setLang() {
      const lang = this.$route.params.lang;

      if (lang === "id") {
        this.display.dailyPerformance = this.lang.dailyPerformance[lang];
        this.display.riskProfile = this.lang.riskProfile[lang];
        this.display.riskProfileValue = this.lang.riskProfileValue[lang];
        this.display.performYearSymbol = this.lang.performYearSymbol[lang];
        this.display.seeDetail = this.lang.seeDetail[lang];
        this.display.nav = this.lang.nav[lang];
      }
    },
    isDayValueUp(product) {
      // console.log(product.performance.dayValue);
      // console.log(product.performance.dayValue > 0);
      return product?.performance?.dayValue > 0;
    },
    getMutualFunds() {
      this.isLoading = true;
      const type = this.$route.params.type;
      let url = "";

      // url = "http://trading.simasnet.com/ROL/web/nab.php";

      if (process.env.NODE_ENV === "production") {
        url = window.location.origin + "/api/nab";
      } else {
        url = "http://trading.simasnet.com/ROL/web/nab.php";
      }
      axios
        .get(url)
        .then(async (res) => {
          if (!res.data.results) {
            this.errorFetch = true;
            return true;
          }
          const data = res.data.results;
          let filtered = null;
          if (type !== "RDSYR") {
            if (type === "etf" || type === "ETF") {
              filtered = data.filter((el) => el.type_id === "RDS");
            } else {
              filtered = data.filter((el) => el.type_id === type);
            }
            filtered.forEach((el) => {
              el.ratingText = this.evaluateRating(el.rating);
              el.ratingColor = this.evaluateRatingColor(el.rating);
              return el;
            }, filtered);
          } else {
            filtered = data.filter((el) => el.product_name.includes("Syariah"));
            filtered.forEach((el) => {
              el.ratingText = this.evaluateRating(el.rating);
              el.ratingColor = this.evaluateRatingColor(el.rating);
              return el;
            }, filtered);
          }

          this.products = filtered;

          if (type === "RDPU") {
            this.products = this.products.filter(
              (el) => el.product_id === "014"
            );
          }

          // Filter ETF from FE
          if (type === "ETF" || type === "etf") {
            // const etf_codes = ["183", "187", "200"];
            const etf_codes = ["183", "200"];
            let etf_products = [];
            etf_codes.forEach((code) => {
              const product = this.products.filter(
                (el) => el.product_id === code
              );
              console.log(product);
              etf_products.push(product[0]);
            });

            console.log(etf_products);
            this.products = etf_products;
          }

          if (type === "RDS") {
            // const etf_codes = ["183", "187", "200"];
            const etf_codes = ["183", "200"];
            etf_codes.forEach((code) => {
              const idx = this.products.findIndex(
                (el) => el.product_id === code
              );
              this.products.splice(idx, 1);
            });
          }

          this.isLoading = true;
          for (let i = 0; i < this.products.length; i++) {
            this.products[i] = {
              ...this.products[i],
              performance: await this.getChartData(this.products[i].product_id),
              detail: this.getProductDetail(this.products[i].product_id)
            };
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally( () => {
          // this.isLoading = false;
          // await this.products.map(el=>{
          //   return {
          //     ...el,
          //      detail: this.getProductDetail(el.product_id)
          //   }
          // })
          console.log("this.product", this.products);
        });
    },
    evaluateRating(rating) {
      switch (rating) {
        case "0":
          return this.display.riskProfileValue[0];
        case "2":
          return this.display.riskProfileValue[0];
        case "3":
          return this.display.riskProfileValue[1];
        case "4":
          return this.display.riskProfileValue[1];
        case "5":
          return this.display.riskProfileValue[2];
        default:
          break;
      }
    },
    evaluateRatingColor(rating) {
      switch (rating) {
        case "0":
          return "text-green-600";
        case "2":
          return "text-green-600";
        case "3":
          return "text-amber-600";
        case "4":
          return "text-pink-700";
        case "5":
          return "text-pink-700";
        default:
          break;
      }
    },
    goto(name) {
      let rawName = name.toLowerCase().split(" ");
      const type = this.$route.params.type;
      if (rawName[0] === "syariah") {
        const type = this.$route.params.type;
        if (type.toLowerCase() !== "etf") {
          console.log("etf");
          rawName.shift();
        }
      }
      let modName = rawName.join("-");
      let urlname = name.toLowerCase().replace(/ /g, "-");
      // let modName = urlname.split()
      localStorage.setItem("urlname", urlname);
      const url = "https://sam.admire.id/final/" + modName;
      if(this.language === 'id'){
        let idUrl = url + '-id'
        window.open(idUrl, "_blank");
      } else {
        window.open(url, "_blank");
      }
      
    },
    formatDate(dateString) {
      if (dateString) {
        return dateString.replaceAll("-", "/");
      }
    },
    formatNAB(num) {
      const isFormat = false;
      if (isFormat) return (Math.round(num * 100) / 100).toFixed(2);
      return num;
    },
    displayName(name) {
      let rawName = name.toLowerCase().split(" ");
      if (rawName[0] === "syariah") {
        const type = this.$route.params.type;
        if (type.toLowerCase() !== "etf") {
          console.log("etf");
          rawName.shift();
        }
      }
      let procName = [];
      for (let i = 0; i < rawName.length; i++) {
        procName.push(rawName[i].charAt(0).toUpperCase() + rawName[i].slice(1));
      }
      const finalName = procName.join(" ");

      return finalName;
    },
    async getChartData(id) {
      const start = moment(this.todayDate).format("YYYY-MM-DD");
      const end = moment(this.selectedDate).format("YYYY-MM-DD");
      let url = "https://rol.sinarmas-am.co.id/API/web/nab_range.php";

      if (process.env.NODE_ENV === "production") {
        url = window.location.origin + "/api/nab_range";
      } else {
        url = "https://rol.sinarmas-am.co.id/API/web/nab_range.php";
      }

      let req = {
        product_id: id,
        start_date: end,
        end_date: start,
      };

      let product = {
        dayPercentage: 0,
        dayValue: 0,
      };

      await axios
        .post(url, req, {
          headers: {
            "Content-Type": "text/plain",
          },
        })
        .then((res) => {
          const results = res.data.results;

          const sliced = results.slice(-2);
          const calcDay = (sliced[1].nab - sliced[0].nab) / sliced[1].nab;
          const dayValue = sliced[1].nab - sliced[0].nab;
          this.dayPercentage = calcDay * 100;

          product = {
            dayPercentage: this.dayPercentage,
            dayValue: dayValue,
          };
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
      return product;
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
          return res.data.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
.product:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);
}

.detail-text:hover{
  color: #1142f5;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.detail-text:hover .ic-redirect{
    background-image: url('~@/assets/arrow-up-right-hover.svg');
  }

.ic{
  height: 24px;
  width: 24px;
  &.ic-redirect{
    background-image: url('~@/assets/arrow-up-right.svg');
  }
}
</style>
