<template>
  <section>
    <div>
      <Line
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="chartPlugins"
        :css-classes="cssClasses"
        :styles="styles"
        ref="lineSimas"
      />
    </div>
  </section>
</template>

<script>
import { Line } from "vue-chartjs";
import axios from "axios";
import moment from "moment";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

export default {
  name: "ProductCalcV2",
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
    duration: {
      type: Number,
      default: 12,
    },
    // width: {
    //   type: Number,
    //   default: 100,
    // },
    // height: {
    //   type: Number,
    //   default: 100,
    // },
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
    investAmount: {
      type: Number,
      default: 0,
    },
    calcInvest: {
      type: Array,
      default: () => [],
    },
    calcDeposito: {
      type: Array,
      default: () => [],
    },
    calcSaving: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    var self = this;
    return {
      chartData: {
        labels: ["Tahun 5", "Tahun 10", "Tahun 15", "Tahun 20", "Tahun 25"],
        datasets: [
          {
            label: "Reksadana Sinarmas",
            data: [1, 2, 3, 4, 5],
            fill: false,
            // backgroundColor: "rgb(16, 178, 78)",
            // borderColor: "rgb(16, 178, 78)",
            pointBackgroundColor: "transparent",
            //  borderColor: (context) => {
            //   const chart = context.chart;
            //   const { ctx, chartArea } = chart;

            //   if (!chartArea) {
            //     // This case happens on initial chart load
            //     return null;
            //   }
            //   return self.getGradient(ctx, chartArea, "#1CBBB4", "#8EF378");
            // },
            borderColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(1000, 0, 0, 100);

              gradient.addColorStop(0, "#8EF378");
              gradient.addColorStop(0.5, "#55d796");
              gradient.addColorStop(1, "#1CBBB4");

              return gradient;
            },
            borderWidth: 4,
            tension: 0.4,
          },
          {
            label: "Deposito",
            data: [1, 2, 3, 4, 5],
            fill: false,
            // backgroundColor: "rgb(91,91,91)",
            // borderColor: "rgb(91,91,91)",
            pointBackgroundColor: "transparent",
            borderColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(1000, 0, 0, 100);

              gradient.addColorStop(0, "#2AEEFF");
              gradient.addColorStop(0.5, "#45aaf3");
              gradient.addColorStop(1, "#5580EB");

              return gradient;
            },
            borderWidth: 4,
            tension: 0.4,
          },
          // {
          //   label: "Tabungan biasa",
          //   data: [1, 2, 3, 4, 5],
          //   fill: false,
          //   pointBackgroundColor: "transparent",
          //   borderColor: (ctx) => {
          //     const canvas = ctx.chart.ctx;
          //     const gradient = canvas.createLinearGradient(1000, 0, 0, 100);

          //     gradient.addColorStop(0, "#F3A983");
          //     gradient.addColorStop(0.5, "#eb826d");
          //     gradient.addColorStop(1, "#E77163");

          //     return gradient;
          //   },
          //   borderWidth: 4,
          //   tension: 0.4,
          // },
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
              display: false, //this will remove only the label
            },
          },
        },
        plugins: {
          chartAreaBorder: {
            borderWidth: 0,
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              padding: 32,
              font: {
                family: "'Inter', 'Helvetica', 'Arial', 'sans-serif'",
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
      chartPlugins: [],
      apikey: "dXUpzvWgv2nzCgkZUs3OY1aDVIZ7Vwq4",
      activeBtn: 1,
      data: {},
      timespans: [
        { name: "All", value: 3 },
        { name: "1m", value: 1 },
        { name: "3m", value: 3 },
        { name: "6m", value: 6 },
        { name: "1y", value: 1 },
      ],
      selectedTime: {
        duration: 1,
        type: "months",
      },
      widthCanvas: 0,
      heightCanvas: 0,
      gradientCanvas: null,
    };
  },
  mounted() {
    this.initChart();
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
  watch: {
    calcInvest(newValue, oldValue) {
      console.log("calcInvest");
      console.log(newValue.length > 0);
      this.chartData.datasets[0].data = [];
      if (newValue.length > 0) {
        this.chartData.datasets[0].data = newValue;
      }
    },
    calcDeposito(newValue, oldValue) {
      console.log("calcDeposito");
      console.log(newValue);
      this.chartData.datasets[1].data = [];
      if (newValue.length > 0) {
        this.chartData.datasets[1].data = newValue;
      }
    },
    // calcSaving(newValue, oldValue) {
    //   console.log("calcSaving");
    //   if (newValue.length > 0) {
    //     this.chartData.datasets[2].data = newValue;
    //   }
    // },
  },
  methods: {
    initChart() {
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      for (let i = 0; i < this.duration; i++) {
        this.chartData.labels.push(`M ${i + 1}`);
        // this.chartData.labels.push(`T  `);
      }

      let invest = 500000;
      let deposito = 500000;
      let saving = 500000;

      let baseAdd = 1000000;

      let arrInvest = [];
      let arrDeposito = [];
      let arrSaving = [];
      arrInvest.push(invest);
      arrDeposito.push(deposito);
      arrSaving.push(saving);

      let monthly = 11;
      for (let i = 1; i < this.duration; i++) {
        // Calculation values
        invest = invest + baseAdd * Math.pow(1 + 13 / 100 / 12, 12 * i);
        deposito = deposito + baseAdd * Math.pow(1 + 8 / 100 / 12, 12 * i);
        saving = saving + baseAdd * Math.pow(1 + 0 / 100 / 12, 12 * i);

        //Add Values to array
        arrInvest.push(invest);
        arrDeposito.push(deposito);
        arrSaving.push(saving);
      }

      // Set array to chart
      this.chartData.datasets[0].data = arrInvest;
      this.chartData.datasets[1].data = arrDeposito;
      // this.chartData.datasets[2].data = arrSaving;
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
    selectTimespan(time) {
      const idx = this.timespans.findIndex((el) => el.name === time.name);
      this.activeBtn = idx;
      if (time.name === "All" || time.name === "1y") {
        this.selectedTime.type = "years";
      } else {
        this.selectedTime.type = "months";
      }
      this.selectedTime.duration = time.value;
      this.getData();
    },
    calculateStockDates(timeResults) {
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
    getGradient(ctx, chartArea, colorOne, colorTwo) {
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
        this.gradientCanvas.addColorStop(0, colorOne);
        this.gradientCanvas.addColorStop(1, colorTwo);
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

// rgb(56, 239, 125)
