<template>
  <div class="flex justify-between">
    <button @click="prevItem" class="p-2 opacity-80 bg-white rounded-lg"><img src="@/assets/chevron-left.svg"></button>

    <div class="w-full">
      <Carousel
        v-bind="settings"
        ref="carousel"
        v-model="currentSlide"
        :transition="800"
        :mouseDrag="false"
        :touchDrag="false"
      >
        <Slide v-for="slide in 10" :key="slide">
          <div
            class="text-left bg-white shadow-sm rounded-lg p-4 border-2 carousel__item"
          >
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
              <div class="text-gray-400 text-xs" style="letter-spacing: 1px">NAB / Unit</div>
              <div class="text-green-600 text-end text-sm font-medium">1.24%</div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>

    <button @click="nextItem" class="p-2 opacity-80 bg-white rounded-lg"><img src="@/assets/chevron-right.svg"></button>
  </div>
</template>

<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import axios from 'axios';

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
        itemsToScroll: 3.5,
        snapAlign: "center",
      },
      currentSlide: 0,
      products: []
    };
  },
  mounted(){
    this.getData();
  },
  methods: {
    nextItem() {
      this.$refs.carousel.next();
    },
    prevItem() {
      this.$refs.carousel.prev();
    },
    getData(){
      const url = "http://trading.simasnet.com/ROL/web/nab.php";
      axios
        .get(url)
        .then((res) => {
          const data = res.data.results;
          this.products = data;
          // const rawName = name.split('-');
          // let procName = []
          // for (let i = 0; i < rawName.length; i++) {
          //   procName.push(rawName[i].charAt(0).toUpperCase() + rawName[i].slice(1))
          // }
          // console.log(data)

          // const finalName = procName.join(' ');
          // console.log(finalName)
          // this.product = data.filter((el) => el.product_name === finalName)[0]
          // this.getChartData(this.product?.product_id)
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    }
  },
};
</script>

<style lang="css">
.carousel__item {
  /* min-height: 200px; */
  min-width: 100%;
  /* background-color: #10b981; */
  /* color: #fff; */
  /* font-size: 20px; */
  /* border-radius: 8px; */
}
</style>
