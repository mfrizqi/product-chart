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
    // var self = this;
    return {
      chartData: {
        labels: ["5 Tahun", "10 Tahun", "15 Tahun", "20 Tahun", "25 Tahun"],
        datasets: [
          {
            label: "Investasi di Sinarmas",
            data: [1, 2, 3, 4, 5],
            fill: false,
            backgroundColor: "rgb(16, 178, 78)",
            borderColor: "rgb(16, 178, 78)",
            pointBackgroundColor: "rgb(16, 178, 78)",
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: "Deposito",
            data: [1, 2, 3, 4, 5],
            fill: false,
            backgroundColor: "rgb(91,91,91)",
            borderColor: "rgb(91,91,91)",
            pointBackgroundColor: "rgb(91,91,91)",
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: "Tabungan biasa",
            data: [1, 2, 3, 4, 5],
            fill: false,
            backgroundColor: "rgb(230,145,56)",
            borderColor: "rgb(230,145,56)",
            pointBackgroundColor: "rgb(230,145,56)",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          point: {
            radius: 2,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
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
            position: 'bottom',
            labels:{
              font: {
                family: "'Inter', 'Helvetica', 'Arial', 'sans-serif'"
              }
            }
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
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
      if (newValue.length > 0) {
        this.chartData.datasets[0].data = newValue;
      }
    },
    calcDeposito(newValue, oldValue) {
      console.log("calcDeposito");
      if (newValue.length > 0) {
        this.chartData.datasets[1].data = newValue;
      }
    },
    calcSaving(newValue, oldValue) {
      console.log("calcSaving");
      if (newValue.length > 0) {
        this.chartData.datasets[2].data = newValue;
      }
    },
  },
  methods: {
    initChart() {
      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];
      for (let i = 0; i < 25; i++) {
        this.chartData.labels.push(`T ${i + 1}`);
      }

      let invest = 1000000;
      let deposito = 1000000;
      let saving = 1000000;

      let baseAdd = 1000000;

      let arrInvest = [];
      let arrDeposito = [];
      let arrSaving = [];
      arrInvest.push(invest);
      arrDeposito.push(deposito);
      arrSaving.push(saving);

      let monthly = 11;
      for (let i = 1; i < 25; i++) {
        // Calculation values
        invest = invest +  (baseAdd * Math.pow(1 + 13 / 100 / 12, 12 * i)) * monthly;
        deposito = deposito + (baseAdd * Math.pow(1 + 8 / 100 / 12, 12 * i)) * monthly;
        saving = saving + (baseAdd * Math.pow(1 + 0 / 100 / 12, 12 * i)) * monthly;

        //Add Values to array
        arrInvest.push(invest);
        arrDeposito.push(deposito);
        arrSaving.push(saving);
      }

      // Set array to chart
      this.chartData.datasets[0].data = arrInvest;
      this.chartData.datasets[1].data = arrDeposito;
      this.chartData.datasets[2].data = arrSaving;
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
