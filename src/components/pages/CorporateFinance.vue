<template>
  <div class="container mx-auto mt-16 mb-16">
    <h1 class="font-bold text-center text-4xl mb-16 px-6">Corporate Finance</h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-16"
    >
      <div
        v-for="(fin, index) in finances"
        :key="index"
        class="drop-shadow-lg bg-white rounded-md p-6 finance"
      >
        <div class="flex items-center">
          <div
            class="flex items-center justify-center rounded-full ticker text-white text-xs"
            style="min-height: 48px; min-width: 48px"
          >
            {{ fin.ticker }}
          </div>
          <h3 class="font-bold text-md lg:text-lg mx-3 title">
            {{ fin.name }} ({{ fin.year }})
          </h3>
        </div>
        <h3
          class="font-bold text-xl pb-2 mt-6 mb-4 border-b-slate-200 border-b"
        >
          Offering
        </h3>
        <div class="flex">
          <div class="mr-6">
            <h4 class="font-semibold">Structure (IDR)</h4>
            <div>{{ fin.offer_struc }}</div>
          </div>
          <div class="ml-6">
            <h4 class="font-semibold">Price</h4>
            <div>{{ fin.offer_price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reksadanaCampuran",
  data() {
    return {
      finances: [
        {
          name: "PT Forza Land Indonesia Tbk",
          ticker: "FORZ",
          offer_struc: "68.750.000.000",
          offer_price: "220",
          year: "2017",
        },
        {
          name: "PT Pelayaran Tamarin Samudra Tbk",
          ticker: "TAMU",
          offer_struc: "82.500.000.000",
          offer_price: "110",
          year: "2017",
        },
        {
          name: "PT Marga Abhinava Abadi Tbk",
          ticker: "MABA",
          offer_struc: "53.090.000.000",
          offer_price: "112",
          year: "2017",
        },
        {
          name: "PT Kioson Komersial Indonesia Tbk",
          ticker: "KIOS",
          offer_struc: "45.000.000.000",
          offer_price: "300",
          year: "2017",
        },
        {
          name: "PT Dwi Guna Laksana Tbk",
          ticker: "DWGL",
          offer_struc: "465.000.000.000",
          offer_price: "150",
          year: "2017",
        },
        {
          name: "PT Tridomain Performance Materials Tbk",
          ticker: "TDPM",
          offer_struc: "411.015.600.000",
          offer_price: "228",
          year: "2018",
        },
        {
          name: "PT Dafam Property Indonesia Tbk",
          ticker: "DFAM",
          offer_struc: "46.000.000.000",
          offer_price: "115",
          year: "2018",
        },
        {
          name: "PT NFC Indonesia Tbk",
          ticker: "NFCX",
          offer_struc: "308.334.875.000",
          offer_price: "1850",
          year: "2018",
        },
        {
          name: "PT HK  Metals Utama Tbk",
          ticker: "HKMU",
          offer_struc: "235.000.200.000",
          offer_price: "230",
          year: "2018",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.finance {
  & .ticker {
    background-color: #18181b;
    color: white;
  }
  &:hover {
    & .title {
      color: #4979d1;
    }
    & .ticker {
      background-color: #4979d1;
      color: white;
    }
  }
}
</style>
