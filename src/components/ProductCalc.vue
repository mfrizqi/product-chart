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
    investAmount: {
      type: Number,
      default: 0
    }
  },
  data() {
    // var self = this;
    return {
      chartData: {
        labels: ["5 Tahun", "10 Tahun", "15 Tahun", "20 Tahun", "25 Tahun"],
        datasets: [
          {
            label: "",
            data: [1, 2, 3, 4, 5],
            fill: true,
            backgroundColor: "rgb(16, 178, 78)",
            borderColor: "rgb(16, 178, 78)",
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
            radius: 3,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointHoverBackgroundColor: "rgb(16, 178, 78)",
          },
        },
        scales: {
          x: {
            grid: { display: true, borderColor: "rgb(255,255,255)" },
            ticks: {
              display: true, //this will remove only the label
            },
          },
          y: {
            type: "linear",
            position: "left",
            grid: { display: true, borderColor: "rgb(255,255,255)" },
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
          filler: {
            propagate: true,
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
    // this.getData();
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
  methods: {
    initChart() {
      this.chartData.labels = [];
      this.chartData.datasets.data = [];
      for (let i = 0; i < 25; i++) {
        this.chartData.labels.push(`T ${i + 1}`);
      }

      let percentage = 0;
      let arrPercent = [];
      for (let i = 0; i < 25; i++) {
        percentage = percentage + i * (5 / 100);
        arrPercent.push(percentage);
      }
      this.chartData.datasets[0].data = arrPercent;
    },
    getData() {
      const url = `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/${this.selectedDate}/${this.todayDate}?adjusted=true&sort=asc&limit=5000&apiKey=${this.apikey}`;
      axios
        .get(url)
        .then((res) => {
          this.data = res.data;
          const cValue = this.data.results.map((el) => el.c);
          const dataDates = this.calculateStockDates(this.data.results);
          console.table(cValue);
          console.table(dataDates);
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
