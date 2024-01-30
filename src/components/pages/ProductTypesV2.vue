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
      <div
        v-for="(product, index) in products"
        :key="index"
        class="border-t border-b border-zinc-200 p-6"
        :class="[{ 'border-t': index === 0 }]"
      >
        <div class="mb-4 font-semibold flex justify-between">
          <div class="cursor-pointer" @click="goto(product?.product_name)">
            {{ displayName(product?.product_name) }}
          </div>
          <div class="cursor-pointer md:hidden block">
            <div @click="goto(product?.product_name)">
              <img
                src="@/assets/arrow-up-right.svg"
                class="inline-block"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="flex shrink justify-between">
          <div style="min-width: 200px">
            <div class="font-normal text-sm">
              NAB {{ formatDate(product?.nab_date) }}
            </div>
            <div class="mt-2 mb-4">
              <span class="font-normal mr-2">IDR</span>
              <span class="font-medium text-3xl">
                {{
                  formatNAB(product?.nab).toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                  })
                }}
              </span>
            </div>
          </div>
          <div>
            <div class="text-sm text-right font-medium">Kinerja per hari</div>
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
            <div class="text-sm text-right font-medium">1Y</div>
            <div class="font-semibold">{{ product?.return_one_year }}%</div>
          </div>
          <div class="md:block hidden">
            <div class="text-sm text-right font-medium">3Y</div>
            <div class="font-semibold">{{ product?.return_three_year }}%</div>
          </div>
          <div class="md:block hidden">
            <div class="text-sm text-right font-medium">5Y</div>
            <div class="font-semibold">{{ product?.return_five_year }}%</div>
          </div>
          <div class="cursor-pointer md:block hidden">
            <div @click="goto(product?.product_name)">
              <img
                src="@/assets/arrow-up-right.svg"
                class="inline-block"
                alt=""
              />
              <span class="font-semibold"> Lihat Detail</span>
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
          <span class="font-normal">Tingkat Risiko: </span>
          <span class="font-bold" v-if="product?.rating">{{
            product?.ratingText
          }}</span>
          <span class="font-bold" v-if="!product?.rating">{{ "-" }}</span>
        </div>
      </div>
    </div>

    <div
      class="px-4 py-4 flex items-center justify-between border rounded-lg bg-red-500 mt-4"
      style="display: none"
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
      style="display: none"
    >
      <!-- <div class="flex items-center">
        <div class="ml-2 mr-12 font-bold text-red-500">{{ index + 1 }}</div>
        <div class="mr-12 font-bold">{{ product.product_name }}</div>
        <div class="text-sm">
          <span class="text-gray-500 mr-4">Profil Resiko</span
          ><span
            class="font-bold"
            v-if="product.rating"
            :class="product.ratingColor"
            >{{ product?.ratingText }}</span
          >
          <span class="font-bold" v-if="!product.rating">{{ "-" }}</span>
        </div>
      </div>
      <div class="flex">
        <div class="text-sm mr-12">
          NAB / Unit
          <span class="text-green-600 font-bold">Rp. {{ product.nab }}</span>
        </div>
        <div class="text-sm mr-6">
          YTD
          <span class="text-green-600 font-bold"
            >{{ product.return_year_to_date }}%</span
          >
        </div>
        <div @click="goto(product.product_name)" class="cursor-pointer">
          <img src="@/assets/arrow-up-right.svg" alt="" />
        </div>
      </div> -->

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

    <!-- <div class="ml-2  font-bold text-red-500">{{ index + 1 }}</div>
      <div class=" font-bold">{{ product.product_name }}</div>
      <div class="text-sm">
        <span class="text-gray-500 mr-4">Profil Resiko</span
        ><span
          class="font-bold"
          v-if="product.rating"
          :class="product.ratingColor"
          >{{ product?.ratingText }}</span
        >
        <span class="font-bold" v-if="!product.rating">{{ "-" }}</span>
      </div>
      <div class="text-sm ">
        NAB / Unit
        <span class="text-green-600 font-bold">Rp. {{ product.nab }}</span>
      </div>
      <div class="text-sm mr-6">
        YTD
        <span class="text-green-600 font-bold"
          >{{ product.return_year_to_date }}%</span
        >
      </div>
      <div @click="goto(product.product_name)" class="cursor-pointer">
        <img src="@/assets/chevron-right.svg" alt="" />
      </div> -->
    <!-- </div> -->
    <!-- <div
      class="grid grid-cols-6 gap-4"
      v-for="(product, index) in products"
      :key="index"
    >
      <div class="ml-2 font-bold text-red-500 ">{{ index + 1 }}</div>
      <div class="font-bold">{{ product.product_name }}</div>
      <div class="text-sm">
        <span class="text-gray-500 mr-4">Profil Resiko</span
        ><span
          class="font-bold"
          v-if="product.rating"
          :class="product.ratingColor"
          >{{ product?.ratingText }}</span
        >
        <span class="font-bold" v-if="!product.rating">{{ "-" }}</span>
      </div>
      <div class="text-sm">
        NAB / Unit
        <span class="text-green-600 font-bold">Rp. {{ product.nab }}</span>
      </div>
      <div class="text-sm mr-6">
        YTD
        <span class="text-green-600 font-bold"
          >{{ product.return_year_to_date }}%</span
        >
      </div>
      <div @click="goto(product.product_name)" class="cursor-pointer text-right">
        <img src="@/assets/chevron-right.svg" alt="" />
      </div>
    </div> -->
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
    };
  },
  mounted() {
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
    getMutualFunds() {
      this.isLoading = true;
      const type = this.$route.params.type;
      let url = "";

      url = "http://trading.simasnet.com/ROL/web/nab.php";

      // if (process.env.NODE_ENV === "production") {
      //   url = window.location.origin + "/api/nab";
      // } else {
      //   url = "http://trading.simasnet.com/ROL/web/nab.php";
      // }
      axios
        .get(url)
        .then(async (res) => {
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
            };
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
          console.log("this.product", this.products);
        });
    },
    evaluateRating(rating) {
      switch (rating) {
        case "0":
          return "Rendah";
        case "2":
          return "Rendah";
        case "3":
          return "Menengah";
        case "4":
          return "Menengah Ke Tinggi";
        case "5":
          return "Tinggi";
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
          console.log('etf')
          rawName.shift();
        }
      }
      let modName = rawName.join("-");
      let urlname = name.toLowerCase().replace(/ /g, "-");
      // let modName = urlname.split()
      localStorage.setItem("urlname", urlname);
      const url = "https://sam.admire.id/final/" + modName;
      window.open(url, "_blank");
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
          console.log('etf')
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
  },
};
</script>

<style scoped>
.product:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);
}
</style>
