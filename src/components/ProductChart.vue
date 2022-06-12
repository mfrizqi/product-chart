<template>
  <section>
    <div class="container">
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

.container {
  position: relative;
  margin: auto;
  height: auto;
  width: 70%;
}
</style>
