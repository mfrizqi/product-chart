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
      <!-- <div
        v-infinite-scroll="loadMore()"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="limit"
      >
        <li
          v-for="(post, index) in posts"
          :key="index"
          style="margin-bottom: 2rem"
          data-aos="slide-up"
          data-aos-offset="100"
          data-aos-easing="ease-out-back"
        >
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ post.title }}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>{{ post.body }}</p>
              </div>
            </div>
          </div>
        </li>
      </div> -->
      <!-- <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-16"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="100000"
        infinite-scroll-listen-for-event="scrolledItem"
        infinite-scroll-immediate-check="true"
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
      </div> -->
      <div id="app" class="hidden">
        <h1>Random User</h1>
        <div id="wrapUser">
          <div class="user" v-for="user in users" :key="user.first">
            <div class="user-avatar">
              <img :src="user.picture.large" />
            </div>
            <div class="user-details">
              <h2 class="user-name">
                {{ user.name.first }}
                {{ user.name.last }}
              </h2>
              <ul>
                <li>
                  <strong>Birthday:</strong> {{ formatDate(user.dob.date) }}
                </li>
                <li>
                  <strong>Location:</strong> {{ user.location.city }},
                  {{ user.location.state }}
                </li>
              </ul>
            </div>
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
      data: [],
      busy: true,
      users: [],
    };
  },
  beforeMount() {
    this.getInitialUsers();
  },
  ready() {
    console.log("READY====");
    const divHeight = document.getElementById("wrapUser").clientHeight;
    const offsetHeight = document.documentElement.offsetHeight;

    console.log("divHeight", divHeight);
    console.log("offsetHeight", offsetHeight);
    console.log("====READY");
  },
  mounted() {
    // this.getNextUser();

    const wrapUser = document.getElementById("wrapUser");
    console.log("initialUser");
    console.log(document.getElementById("wrapUser").clientHeight);
    console.log(document.getElementById("wrapUser").offsetHeight);
    console.log(document.getElementById("wrapUser").scrollHeight);

    let bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;
    console.log("bottomOfWindow");
    console.log(document.documentElement.scrollTop);
    console.log(window.innerHeight);
    console.log(document.documentElement.offsetHeight);
    console.log(bottomOfWindow);

    this.$nextTick(() => {
      const divHeight = document.getElementById("wrapUser").clientHeight;
      const offsetHeight = document.documentElement.offsetHeight;

      console.log("divHeight", divHeight);
      console.log("offsetHeight", offsetHeight);

      if (divHeight < innerHeight) {
        axios.get(`https://randomuser.me/api/`).then((response) => {
          console.log("load User");
          console.log(response.data.results[0]);
          this.users.push(response.data.results[0]);
        });
      }
    });
  },
  methods: {
    loadMore: function () {
      console.log("loadMore");
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({
            name: "PT HK  Metals Utama Tbk - " + i,
            ticker: "HKMU",
            offer_struc: "235.000.200.000",
            offer_price: 230 + i,
            year: "2018",
          });
        }
        this.busy = false;
      }, 1000);
    },
    async getInitialUsers() {
      await axios
        .get(`https://randomuser.me/api/?results=5`)
        .then((response) => {
          this.users = response.data.results;
        });
    },
    formatDate(dateString) {
      let convertedDate = new Date(dateString);
      return convertedDate.toDateString();
    },
    getNextUser() {
      // Check height if sufficient to scroll or less data
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          axios.get(`https://randomuser.me/api/`).then((response) => {
            this.users.push(response.data.results[0]);
          });
        }
      };
    },
  },
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

.user {
  display: flex;
  background: #ccc;
  border-radius: 1em;
  margin: 1em auto;
}

.user-avatar {
  padding: 1em;
}

.user-avatar img {
  display: block;
  width: 100%;
  min-width: 64px;
  height: auto;
  border-radius: 50%;
}

.user-details {
  padding: 1em;
}

.user-name {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 900;
}
</style>
