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
    <div class="px-4 py-4 flex items-center justify-between border rounded-lg bg-red-500">
      <div class="ml-2 mr-10 font-bold text-white">No</div>
      <div class="flex-1 text-center font-bold text-white">Nama Produk</div>
      <div class="flex-1 text-center font-bold text-white">
          Profil Risiko
      </div>
      <div class="flex-1 text-center font-bold text-white">
        NAB/Unit
      </div>
      <div class="flex-1 text-center font-bold text-white">
        YTD
      </div>
      <div class="px-6"></div>
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      class="px-4 py-4 flex items-center justify-between border rounded-lg bg-neutral-100 hover:bg-white product"
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
        <span class="text-green-600 font-bold">{{ product.return_year_to_date }}%</span>
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
export default {
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  mounted() {
    this.getMutualFunds();
  },
  methods: {
    getMutualFunds() {
      this.isLoading = true;
      const type = this.$route.params.type;
      console.log(type);
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
          let filtered = null;
          if (type !== "RDSYR") {
            filtered = data.filter((el) => el.type_id === type);
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
            // this.products.pop();
            this.products = this.products.filter(
              (el) => el.product_id === "014"
            );
            // this.products = product
          }
          // filtered = data.filter((el) => el.type_id === type);
          // filtered.forEach((el) => {
          //   el.ratingText = this.evaluateRating(el.rating);
          //   el.ratingColor = this.evaluateRatingColor(el.rating);
          //   return el;
          // }, filtered);
          // this.products = filtered;

          // if (type === "RDPU") {
          //   this.products.pop();
          // }

          // if (type === "RDSYR") {
          //   const syariah = filtered.filter((el) =>
          //     el.product_name.includes("Syariah")
          //   );
          //   console.log(syariah);
          //   this.products = syariah;
          // }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
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
      let urlname = name.toLowerCase().replace(/ /g, "-");
      const url = "https://sam.admire.id/" + urlname;
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.product:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);
}
</style>
