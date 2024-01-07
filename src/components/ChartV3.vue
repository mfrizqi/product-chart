<template>
  <section>
    <div class="chart-container">
      <!-- V2 -->
      <div class="md:flex mb-6" v-if="withStatus">
        <div class="flex-1">
          <!-- Timespan button -->
          <section
            class="flex justify-center md:justify-start md:mb-0 mb-4 flex-wrap md:flex-nowrap"
          >
            <button
              v-for="(time, index) in timespans"
              :key="index"
              class="rounded-full px-5 py-1 drop-shadow-md font-semibold bg-white mb-4 md:mb-0"
              @click="selectTimespan(time)"
              :class="[
                { active: activeBtn === index },
                { 'mr-4': index < timespans.length - 1 },
              ]"
            >
              {{ time.title }}
            </button>
          </section>
        </div>
        <div class="flex-1 md:ml-4" v-if="showRisk">
          <section class="flex">
            <div
              class="flex-1 p-4 bg-white drop-shadow-md rounded-md mr-3 flex justify-between"
            >
              <div class="flex flex-col justify-between">
                <div class="font-bold block mb-1">
                  {{ currentNabDate[1] }}
                </div>
                <div class="font-bold block text-gray-400 text-sm">
                  {{ currentNabDate[0] }}
                </div>
              </div>
              <div
                class="circle-date flex justify-center items-center text-xl font-bold text-black"
              >
                {{ currentNabDate[2] }}
              </div>
            </div>
            <div
              class="flex-1 p-4 bg-white drop-shadow-md rounded-md flex justify-between"
            >
              <div>
                <span class="font-bold block mb-1">Risk Profile</span>
                <span class="font-bold block text-gray-400 text-sm">Low</span>
              </div>
              <div
                class="circle-gradient flex justify-center items-center text-xl font-bold text-black"
              ></div>
            </div>
          </section>
        </div>
      </div>

      <Line
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :css-classes="cssClasses"
        :styles="styles"
        :plugins="plugins"
      />

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
  </section>
</template>

<script>
import { Line } from "vue-chartjs";
import axios from "axios";
var https = require("https-browserify");
import moment from "moment";

// const crosshair = {
//     id: 'crosshair',
//     defaults: {
//         width: 1,
//         color: '#FF4949',
//         dash: [3, 3],
//     },
//     afterInit: (chart, args, opts) => {
//       chart.crosshair = {
//         x: 0,
//         y: 0,
//       }
//     },
//     afterEvent: (chart, args) => {
//       const {inChartArea} = args
//       const {type,x,y} = args.event

//       chart.crosshair = {x, y, draw: inChartArea}
//       chart.draw()
//     },
//     beforeDatasetsDraw: (chart, args, opts) => {
//       const {ctx} = chart
//       const {top, bottom, left, right} = chart.chartArea
//       const {x, y, draw} = chart.crosshair
//       if (!draw) return

//       ctx.save()

//       ctx.beginPath()
//       ctx.lineWidth = opts.width
//       ctx.strokeStyle = opts.color
//       ctx.setLineDash(opts.dash)
//       ctx.moveTo(x, bottom)
//       ctx.lineTo(x, top)
//       ctx.moveTo(left, y)
//       ctx.lineTo(right, y)
//       ctx.stroke()

//       ctx.restore()
//     }
//   }

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
  name: "Chart",
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
    // plugins: {
    //   type: Object,
    //   default: () => {},
    // },
    withStatus: {
      type: Boolean,
      default: true,
    },
    showRisk: {
      type: Boolean,
      default: true,
    },
    chartValue: {
      type: Object,
      default: () => {},
    },
    productCode: {
      type: String,
      default: "005",
    },
  },
  data() {
    var self = this;
    return {
      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "",
            data: [65, 70, 80, 85, 90, 95, 100],
            fill: false,
            borderColor: "rgb(51, 161, 70)",
            borderWidth: 3,
            tension: 0.1,
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          point: {
            radius: 0,
            pointHoverRadius: 6,
            pointHoverBorderWidth: 0,
            pointHoverBackgroundColor: "rgb(54, 54, 54)",
          },
        },
        scales: {
          x: {
            grid: { display: false, borderColor: "rgb(255,255,255)" },
            ticks: {
              display: true, //this will remove only the label
            },
          },
          y: {
            type: "linear",
            position: "right",
            grid: { display: false, borderColor: "rgb(255,255,255)" },
            ticks: {
              display: true, //this will remove only the label
            },
          },
        },
        plugins: {
          chartAreaBorder: {
            borderWidth: 0,
          },
          legend: {
            display: false,
          },
          corsair: {
            dash: [1, 1],
            color: "rgb(158, 158, 158)",
            width: 2,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
      plugins: [
        {
          id: "corsair",
          afterInit: (chart) => {
            chart.corsair = {
              x: 0,
              y: 0,
            };
          },
          afterEvent: (chart, evt) => {
            const {
              chartArea: { top, bottom, left, right },
            } = chart;
            const {
              event: { x, y },
            } = evt;
            if (x < left || x > right || y < top || y > bottom) {
              chart.corsair = { x, draw: false,};
              chart.draw();
              return;
            }

            chart.corsair = { x, draw: true};
            chart.draw();
          },
          afterDatasetsDraw: (chart, _, opts) => {
            const {
              ctx,
              chartArea: { top, bottom, left, right },
            } = chart;
            const { x, y, draw } = chart.corsair;

            if (!draw) {
              return;
            }

            ctx.lineWidth = opts.width || 0;
            ctx.setLineDash(opts.dash || []);
            ctx.strokeStyle = opts.color || "black";

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, bottom);
            ctx.lineTo(x, top);
            ctx.moveTo(left, y);
            ctx.lineTo(right, y);
            ctx.stroke();
            ctx.restore();
          },
        },
      ],
      apikey: "dXUpzvWgv2nzCgkZUs3OY1aDVIZ7Vwq4",
      token: "YnNpbS1zdGc6YnNpbXN0Zw==",
      isLoading: true,
      activeBtn: 1,
      data: {},
      product: {},
      timespans: [
        { name: "All", title: "Sejak Diluncurkan", value: 10 },
        { name: "1m", title: "1 Bulan", value: 1 },
        { name: "3m", title: "3 Bulan", value: 3 },
        { name: "6m", title: "6 Bulan", value: 6 },
        { name: "1y", title: "1 Tahun", value: 1 },
         { name: "3y", title: "3 Tahun", value: 3 },
        { name: "5y", title: "5 Tahun", value: 5 },
      ],
      selectedTime: {
        duration: 1,
        type: "months",
      },
      widthCanvas: 0,
      heightCanvas: 0,
      gradientCanvas: null,
      currentNabDate: [],
    };
  },
  mounted() {
    this.currentNabDate.push(this.moment().format("YYYY"));
    this.currentNabDate.push(this.moment().format("MMMM"));
    this.currentNabDate.push(this.moment().format("DD"));
    this.getMutualFunds();
  },
  computed: {
    todayDate() {
      return `${moment().format("YYYY-MM-DD")}`;
    },
    selectedDate() {
      return `${moment()
        .subtract(this.selectedTime.duration, this.selectedTime.type)
        .format("YYYY-MM-DD")}`;
    },
  },
  methods: {
    setupChart() {
      console.log(this.chartValue);
      this.data = this.chartValue;
      const navValue = this.data.map((el) => el.nav);
      const dataDates = this.calculateStockDates(this.data);
      this.chartData.datasets[0].data = navValue;
      this.chartData.labels = dataDates;
    },
    getData() {
      const url = `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/${this.selectedDate}/${this.todayDate}?adjusted=true&sort=asc&limit=5000&apiKey=${this.apikey}`;
      axios
        .get(url)
        .then((res) => {
          this.data = res.data;
          const cValue = this.data.results.map((el) => el.c);
          const dataDates = this.calculateStockDates(this.data.results);
          this.chartData.datasets[0].data = cValue;
          this.chartData.labels = dataDates;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getAPIData() {
      const url = `https://bsim.siminvest.co.id/api/v1/pcs/product/fund/${this.productCode}/growth`;
      axios
        .get(url, {
          headers: {
            Authorization: `Basic ${this.token}`,
          },
        })
        .then((res) => {
          this.data = this.chartValue;
          const navValue = this.data.map((el) => el.nav);
          const dataDates = this.calculateStockDates(this.data);
          this.chartData.datasets[0].data = navValue;
          this.chartData.labels = dataDates;
        })
        .catch((error) => {});
    },
    getMutualFunds() {
      const name = this.$route.params.name;
      console.log(name);
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
          const rawName = name.split("-");
          let procName = [];
          for (let i = 0; i < rawName.length; i++) {
            procName.push(
              rawName[i].charAt(0).toUpperCase() + rawName[i].slice(1)
            );
          }
          const finalName = procName.join(" ");
          console.log("finalName: ", finalName);
          this.product = data.filter((el) => el.product_name === finalName)[0];
          console.log("this.product");
          console.log(this.product);
          this.getChartData(this.product?.product_id);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    oldGetChartData(id) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      this.isLoading = true;
      const start = moment(this.todayDate).format("MM/DD/YYYY");
      const end = moment(this.selectedDate).format("MM/DD/YYYY");
      console.log("start-end", start, end);
      const url = `https://trading.simasnet.com/ROL/web/nab_range.php?product_id=${id}&start_date=${end}&end_date=${start}`;

      const instance = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
      let proxy = `https://api.siminvest.co.id/api/v1/products/${id}/growth?period=${this.selectedTime.duration}${this.selectedTime.type[0]}`;

      axios
        .get(proxy)
        .then((res) => {
          console.log(res);
          const data = res.data.data;
          console.log("data");
          console.log(data);

          this.data = data;
          const navValue = this.data.map((el) => el.aum);
          const dataDates = this.calculateStockDates(this.data);
          this.chartData.datasets[0].data = navValue;
          this.chartData.labels = dataDates;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getChartData(id) {
      this.isLoading = true;
      const start = moment(this.todayDate).format("YYYY-MM-DD");
      const end = moment(this.selectedDate).format("YYYY-MM-DD");
      console.log(start, end);
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

      axios
        .post(url, req, {
          headers: {
            "Content-Type": "text/plain",
          },
        })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          console.log("data");
          console.log(data);

          this.data = data;
          console.log(this.data.at(-1));
          const dateNab = moment(this.data.at(-1)["nabdatetime"])
            .format("YYYY-MMM-DD")
            .split("-");
          this.currentNabDate = dateNab;
          const navValue = this.data.map((el) => el.nab);
          const dataDates = this.calculateStockDates(this.data);
          this.chartData.datasets[0].data = navValue;
          this.chartData.labels = dataDates;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    selectTimespan(time) {
      const idx = this.timespans.findIndex((el) => el.name === time.name);
      this.activeBtn = idx;
      if (time.name === "All" || time.name === "1y" || time.name === "3y" || time.name === "5y") {
        this.selectedTime.type = "years";
      } else {
        this.selectedTime.type = "months";
      }
      this.selectedTime.duration = time.value;
      console.log("this.selectedTime");
      console.log(this.selectedTime);
      this.getChartData(this.product?.product_id);
    },
    calculateStockDates(timeResults) {
      const dates = [];
      timeResults.forEach((el) => {
        const date = new Date(el.nabdatetime);
        const momentDate = moment(new Date(el.nabdatetime)).format("MM/DD/YY");
        dates.push(`${momentDate}`);
      });
      return dates;
    },
    calculateStockDatesOld(timeResults) {
      const dates = [];
      timeResults.forEach((el) => {
        const date = new Date(el.nav_datetime);
        const momentDate = moment(el.nav_datetime).format("MMM DD");
        // const monthName = date.toLocaleString("en-US", { month: "short" });
        // const dateNumber = date.getDate();
        dates.push(`${momentDate}`);
      });
      return dates;
    },
    calculateRealDates(timeResults) {
      const dates = [];
      timeResults.forEach((el) => {
        const date = new Date(el.t);
        const monthName = date.toLocaleString("en-US", { month: "short" });
        const dateNumber = date.getDate();
        dates.push(`${monthName} ${dateNumber}`);
      });
      return dates;
    },
    moment() {
      return moment();
    },
    getGradient(ctx, chartArea) {
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (
        this.gradientCanvas === null ||
        this.widthCanvas !== chartWidth ||
        this.heightCanvas !== chartHeight
      ) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        this.widthCanvas = chartWidth;
        this.heightCanvas = chartHeight;
        this.gradientCanvas = ctx.createLinearGradient(
          chartArea.left,
          chartArea.bottom,
          chartArea.right,
          chartArea.top
        );
        this.gradientCanvas.addColorStop(0, "#122eff");
        this.gradientCanvas.addColorStop(1, "#00ff32");
      }

      return this.gradientCanvas;
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
  width: 100%;
}

.active {
  background-color: rgb(24, 24, 24);
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
