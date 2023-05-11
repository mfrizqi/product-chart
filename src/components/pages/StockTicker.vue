<template>
  <!-- <div class="flex justify-between ">
    <button @click="prevItem" class="p-2 opacity-80 bg-white rounded-lg inline-block"><img src="@/assets/chevron-left.svg"></button>

    <div class="w-full inline-block">
      <Carousel
        v-bind="settings"
        ref="carousel"
        v-model="currentSlide"
        :transition="800"
        :mouseDrag="false"
        :touchDrag="false"
      >
        <Slide v-for="(product, index) in products" :key="index">
          <div
            class="text-left bg-white shadow-sm rounded-lg p-4 border-2 carousel__item"
          >
            <div class="text-xs text-gray-500">NAB 28 Mar 2023</div>
            <div>
              <a
                href="#"
                class="inline-block text-gray-800 lg:text-xl font-bold text-xl"
              >
                {{product.product_name}}
              </a>
            </div>
            <div class="text-sm font-medium text-sm text-gray-500">
              Reksa Dana Pasar Uang
            </div>
            <div class="flex justify-between items-end">
              <div class="font-bold text-md text-green-600 mt-2">
                Rp {{product.nab}} ▲
              </div>
              <div class="font-medium text-gray-400 text-xs text-end">YTD</div>
            </div>
             <div class="flex justify-between items-end">
              <div class="text-gray-400 text-xs" style="letter-spacing: 1px">NAB / Unit</div>
              <div class="text-green-600 text-end text-sm font-medium">1.24%</div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>

    <button @click="nextItem" class="p-2 opacity-80 bg-white rounded-lg inline-block"><img src="@/assets/chevron-right.svg"></button>
  </div> -->
  <!-- <div class="grid grid-cols-12">
    <div @click="prevItem" class="p-2 opacity-80 bg-white rounded-lg">
      <img src="@/assets/chevron-left.svg" />
    </div>

    <div class="w-full col-span-10">
      <Carousel
        v-bind="settings"
        ref="carousel"
        v-model="currentSlide"
        :transition="800"
        :mouseDrag="false"
        :touchDrag="false"
      >
        <Slide v-for="(product, index) in products" :key="index">
          <div
            class="text-left bg-white shadow-sm rounded-lg p-4 border-2 carousel__item"
          >
            <div class="text-xs text-gray-500">NAB 28 Mar 2023</div>
            <div>
              <a
                href="#"
                class="inline-block text-gray-800 font-bold text-md"
              >
                Danamas Rupiah Plus
                {{product.product_name}}
              </a>
            </div>
            <div class="text-sm font-medium text-sm text-gray-500">
              {{product.type_name}}
            </div>
            <div class="flex justify-between items-end">
              <div class="font-bold text-md text-green-600 mt-2">
                Rp 4,174.2770 ▲
              </div>
              <div class="font-medium text-gray-400 text-xs text-end">YTD</div>
            </div>
            <div class="flex justify-between items-end">
              <div class="text-gray-400 text-xs" style="letter-spacing: 1px">
                NAB / Unit
              </div>
              <div class="text-green-600 text-end text-sm font-medium">
                1.24%
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>

    <button @click="nextItem" class="p-2 opacity-80 bg-white rounded-lg">
      <img src="@/assets/chevron-right.svg" />
    </button>
  </div> -->

  <div class="relative">
    <button
      @click="prevItem"
      class="p-2 opacity-80 bg-white rounded-lg absolute top-0 bottom-0"
    >
      <img src="@/assets/chevron-left.svg" />
    </button>

    <button
      @click="nextItem"
      class="p-2 opacity-80 bg-white rounded-lg absolute top-0 bottom-0 right-0"
    >
      <img src="@/assets/chevron-right.svg" />
    </button>

    <Carousel
      v-bind="settings"
      ref="carousel"
      v-model="currentSlide"
      class="mx-10"
      :transition="800"
    >
      <Slide v-for="(product, index) in products" :key="index">
        <div
          class="text-left bg-white shadow-sm rounded-lg p-4 border-2 carousel__item flex flex-col justify-center"
        >
          <div>
            <div class="text-xs text-gray-500">NAB {{moment(product.nab_date,"DD-MM-YYYY").format("DD MMM YYYY")}}</div>
            <div>
              <a
                href="#"
                class="inline-block text-gray-800 lg:text-xl font-bold text-xl"
              >
                {{ product.product_name }}
              </a>
            </div>
            <div class="text-sm font-medium text-sm text-gray-500">
              {{ product.type_name }}
            </div>
            <div class="flex justify-between items-end">
              <div class="font-bold text-md mt-2" :class="{'text-red-600': product.return_year_to_date < 0, 'text-green-600': product.return_year_to_date > 0}">
                Rp {{ product.nab.toLocaleString(undefined, { minimumFractionDigits: 4 }) }} <span v-if="product.return_year_to_date > 0">▲</span><span v-if="product.return_year_to_date < 0">▼</span>
              </div>
              <div class="font-medium text-gray-400 text-xs text-end">YTD</div>
            </div>
            <div class="flex justify-between items-end">
              <div class="text-gray-400 text-xs" style="letter-spacing: 1px">
                NAB / Unit
              </div>
              <div class="text-end text-sm font-medium" :class="{'text-red-600': product.return_year_to_date < 0, 'text-green-600': product.return_year_to_date > 0}">
                {{ product.return_year_to_date }}%
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>

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
  </div>
  <!-- <div class="flex justify-between hidden">
    <button @click="prevItem" class="p-2 opacity-80 bg-white rounded-lg">
      <img src="@/assets/chevron-left.svg" />
    </button>

    <Carousel
      v-bind="settings"
      ref="carousel"
      v-model="currentSlide"
      :transition="800"
      :mouseDrag="false"
      :touchDrag="false"
    >
      <Slide v-for="(product, index) in products" :key="index">
        <div
          class="text-left bg-white shadow-sm rounded-lg p-4 border-2 carousel__item flex flex-col justify-center"
        >
          <div>
            <div class="text-xs text-gray-500">NAB 28 Mar 2023</div>
            <div>
              <a
                href="#"
                class="inline-block text-gray-800 lg:text-xl font-bold text-xl"
              >
                Danamas Rupiah Plus
              </a>
            </div>
            <div class="text-sm font-medium text-sm text-gray-500">
              Reksa Dana Pasar Uang
            </div>
            <div class="flex justify-between items-end">
              <div class="font-bold text-md text-green-600 mt-2">
                Rp 4,174.2770 ▲
              </div>
              <div class="font-medium text-gray-400 text-xs text-end">YTD</div>
            </div>
            <div class="flex justify-between items-end">
              <div class="text-gray-400 text-xs" style="letter-spacing: 1px">
                NAB / Unit
              </div>
              <div class="text-green-600 text-end text-sm font-medium">
                1.24%
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>

    <button @click="nextItem" class="p-2 opacity-80 bg-white rounded-lg">
      <img src="@/assets/chevron-right.svg" />
    </button>
  </div> -->

  <div class="relative hidden">
    <div
      @click="prevItem"
      class="cursor-pointer p-2 opacity-80 bg-white rounded-lg absolute top-0 bottom-0"
      style="z-index: 5"
    >
      <img src="@/assets/chevron-left.svg" />
    </div>

    <Carousel
      v-bind="settings"
      ref="carousel"
      v-model="currentSlide"
      :transition="800"
      :mouseDrag="false"
      :touchDrag="false"
    >
      <Slide v-for="(product, index) in products" :key="index">
        <div
          class="text-left bg-white shadow-sm rounded-lg p-4 border-2 carousel__item flex flex-col justify-center"
        >
          <div class="text-xs text-gray-500">NAB 28 Mar 2023</div>
          <div>
            <a href="#" class="inline-block text-gray-800 font-bold text-md">
              Danamas Rupiah Plus
              {{ product.product_name }}
            </a>
          </div>
          <div class="text-sm font-medium text-sm text-gray-500">
            {{ product.type_name }}
          </div>
          <div class="flex justify-between items-end">
            <div class="font-bold text-md text-green-600 mt-2">
              Rp {{ product.nab }} ▲
            </div>
            <div class="font-medium text-gray-400 text-xs text-end">YTD</div>
          </div>
          <div class="flex justify-between items-end">
            <div class="text-gray-400 text-xs" style="letter-spacing: 1px">
              NAB / Unit
            </div>
            <div class="text-green-600 text-end text-sm font-medium">
              {{ product.return_year_to_date }}%
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>

    <div
      @click="nextItem"
      class="cursor-pointer p-2 opacity-80 bg-white rounded-lg absolute top-0 bottom-0 right-0 flex items-center"
    >
      <img src="@/assets/chevron-right.svg" />
    </div>
  </div>
</template>

<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import axios from "axios";
import moment from 'moment';

export default {
  name: "Breakpoints",
  components: {
    Carousel,
    Slide,
    // Navigation,
  },
  data() {
    return {
      // carousel settings
      settings: {
        itemsToShow: 4,
        itemsToScroll: 4,
        snapAlign: "end",
      },
      currentSlide: 0,
      products: [],
      isLoading: true,
      moment: moment
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    nextItem() {
      this.$refs.carousel.next();
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1500);
      
    },
    prevItem() {
      this.$refs.carousel.prev();
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1500);
    },
    getData() {
      this.isLoading = true;
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
          const sortedData = data.sort((a,b) => b.nab-a.nab)
          this.products = sortedData;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false
        });
    },
  },
};
</script>

<style lang="css">
.carousel__item {
  min-height: 176px;
  min-width: 100%;
}
</style>
