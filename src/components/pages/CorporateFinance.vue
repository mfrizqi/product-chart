<template>
  <div class="container mx-auto mt-16 mb-16">
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
          <div  style="height: 122px" class="flex items-center">
            <h3 class="font-bold text-md lg:text-lg mx-3 title">
              {{ fin.name }} ({{ fin.year }})
            </h3>
          </div>
        </div>
        <h3
          class="font-bold text-xl pb-2 mb-4 border-b-slate-200 border-b"
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
import axios from "axios";

export default {
  name: "corporateFinance",
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
          offer_price: "1.850",
          year: "2018",
        },
        {
          name: "PT HK  Metals Utama Tbk",
          ticker: "HKMU",
          offer_struc: "235.000.200.000",
          offer_price: "230",
          year: "2018",
        },
        {
          name: "PT Yelooo Integra Datanet Tbk",
          ticker: "YELO",
          offer_struc: "48.750.000.000",
          offer_price: "375",
          year: "2018",
        },
        {
          name: "PT Shield on Service Tbk",
          ticker: "SOSS",
          offer_struc: "41.250.000.000",
          offer_price: "275",
          year: "2018",
        },
        {
          name: "PT  Distribusi Voucher Nusantara Tbk",
          ticker: "DIVA",
          offer_struc: "632.142.815.000",
          offer_price: "2.950",
          year: "2018",
        },
        {
          name: "PT  Urban Jakarta Propertindo Tbk",
          ticker: "URBN",
          offer_struc: "432.000.000.000",
          offer_price: "1.200",
          year: "2017",
        },
        {
          name: "PT Menteng Heritage Realty Tbk",
          ticker: "HRME",
          offer_struc: "125.133.750.000",
          offer_price: "105",
          year: "2019",
        },
        {
          name: "PT Asuransi Jiwa Sinarmas MSIG, Tbk",
          ticker: "LIFE",
          offer_struc: "4.764.375.000.000",
          offer_price: "12.100",
          year: "2019",
        },
        {
          name: "PT Optima Prima Metal  Sinergi Tbk",
          ticker: "OPMS",
          offer_struc: "54.000.000.000",
          offer_price: "135",
          year: "2019",
        },
        {
          name: "PT Nusantara Almazia Tbk",
          ticker: "NZIA",
          offer_struc: "101.538.360.000",
          offer_price: "220",
          year: "2019",
        },
        {
          name: "PT Uni-Charm Indonesia Tbk",
          ticker: "UCID",
          offer_struc: "1.250.000.000.000",
          offer_price: "1.500",
          year: "2019",
        },
      ],
    };
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: Poppins, sans-serif;
}

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
