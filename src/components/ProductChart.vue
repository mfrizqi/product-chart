<template>
  <section>
    <div class="chart-container">
      <Line
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
      />

      <div class="flex mt-6">
        <div class="flex-1">
          <!-- Timespan button -->
          <section class="flex">
            <button
              v-for="(time, index) in timespans"
              :key="index"
              class="rounded-md mr-6 px-3 py-1 drop-shadow-md font-semibold bg-white"
              @click="selectTimespan(time.value)"
              :class="{ active: activeBtn === index }"
            >
              {{ time.name }}
            </button>
          </section>
        </div>
        <div class="flex-1">
          <section class="flex">
            <div
              class="flex-1 p-4 bg-white drop-shadow-md rounded-md mr-3 flex justify-between"
            >
              <div>
                <span class="font-bold block mb-1">January</span>
                <span class="font-bold block text-gray-400 text-sm">2022</span>
              </div>
              <div
                class="circle-date flex justify-center items-center text-xl font-bold text-black"
              >
                15
              </div>
            </div>
            <div
              class="flex-1 p-4 bg-white drop-shadow-md rounded-md mr-3 flex justify-between"
            >
              <div>
                <span class="font-bold block mb-1">Risk Profile</span>
                <span class="font-bold block text-gray-400 text-sm"
                  >Rendah</span
                >
              </div>
              <div
                class="circle-gradient flex justify-center items-center text-xl font-bold text-black"
              ></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Line } from "vue-chartjs";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default {
  name: "ProductChart",
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: {},
      activeBtn: 0,
      timespans: [
        { name: "All", value: "all" },
        { name: "1m", value: "1" },
        { name: "3m", value: "3" },
        { name: "6m", value: "6" },
        { name: "1y", value: "12" },
      ],
      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "My First Datasets edited",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      chartOptions: {
        scales: {
          x: {
            grid: { display: false, borderColor: "rgb(255,255,255)" },
            ticks: {
              display: true, //this will remove only the label
            },
          },
          y: {
            grid: { display: false, borderColor: "rgb(255,255,255)" },
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          chartAreaBorder: {
            borderWidth: 0,
          },
        },
      },
      apikey: "dXUpzvWgv2nzCgkZUs3OY1aDVIZ7Vwq4",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const url = `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=${this.apikey}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.data = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    selectTimespan(time) {
      console.log(time);
      const idx = this.timespans.findIndex((el) => el.value === time);
      this.activeBtn = idx;
    },
  },
};
</script>

<style scoped>
.box {
  position: absolute;
  width: 405px;
  height: 364.5px;
  left: 50px;
  top: 56px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 36px 24px;
  font-size: 20px;
}

.chart-container {
  position: relative;
  margin: auto;
  height: auto;
  width: 70%;
}

.active {
  background-color: rgb(239 68 68);
  color: white;
}

.circle-date {
  height: 40px;
  width: 40px;
  border: 3px solid rgb(216, 52, 52);
  border-radius: 40px;
}

.circle-gradient {
  height: 40px;
  width: 40px;
  border-radius: 64px;
  background: #11998e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    245deg,
    #38ef7d,
    #11998e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    245deg,
    #38ef7d,
    #11998e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
