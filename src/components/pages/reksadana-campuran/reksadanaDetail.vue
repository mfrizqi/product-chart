<template>
  <div class="container mx-auto p-4">
    <button @click="$router.go(-1)" class="py-2 px-3 rounded-md bg-red-500">
      <span class="font-semibold text-white"> Kembali ke menu</span>
    </button>
    <h1 class="my-8 text-4xl font-semibold text-center">{{product ? product : 'title'}}</h1>
    <div class="container">
      <ProductChartVue/>
    </div>
  </div>
</template>

<script>
import ProductChartVue from '@/components/ProductChart.vue'

export default {
  name: "ReksadanaDetail",
  components:{
    ProductChartVue
  },
  mounted(){
    this.product = this.$route.params.title
  },
  data() {
    return {
      product: {}
    }
  }
}
</script>