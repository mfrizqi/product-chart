import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/pages/Home.vue";
import Calculator from "../components/pages/Calculator.vue";
import ReksadanaCampuran from "../components/pages/reksadana-campuran/reksadanaCampuran";
import ReksadanaDetail from "../components/pages/reksadana-campuran/reksadanaDetail";
import InvestmentPlan from "../components/pages/InvestmentPlan";
import risetPage from "../components/pages/RisetPage";
import corporateFinance from "../components/pages/CorporateFinance";
import QNAPage from "../components/pages/QNAPage";
import FormPage from "../components/pages/FormPage";
import FormInvestment from "../components/pages/FormInvestment";
import ChartsPage from "../components/pages/ChartsPage";
import ChartPage from "../components/pages/ChartPage";
import StockTicker from "../components/pages/StockTicker";

// CHART PAGES
import chartSimasSatu from "../components/pages/investment-charts/002";
import chartDanamasPasti from "../components/pages/investment-charts/005";
import chartDanamasStabil from "../components/pages/investment-charts/008";
import chartDanamasRupiahPlus from "../components/pages/investment-charts/014";
import chartSimasDanamasSaham from "../components/pages/investment-charts/020";
import chartSimasSatuPrima from "../components/pages/investment-charts/049";
import chartSimasSahamBertumbuh from "../components/pages/investment-charts/108";
import chartSimasSahamMaksima from "../components/pages/investment-charts/132";
import chartSimasSyariahPendapatanTetap from "../components/pages/investment-charts/150";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calculator",
    name: "calculator",
    component: Calculator,
  },
  {
    path: "/reksadana-campuran",
    name: "reksadanaCampuran",
    component: ReksadanaCampuran,
  },
  {
    path: "/reksadana-campuran/:name",
    name: "reksadanaDetail",
    component: ReksadanaDetail,
    props: {
      default: true,
      product: {},
    },
  },
  {
    path: "/investment-plan",
    name: "investmentPlan",
    component: InvestmentPlan,
  },
  {
    path: "/riset",
    name: "risetPage",
    component: risetPage,
  },
  {
    path: "/corporate-finance",
    name: "corporateFinance",
    component: corporateFinance,
  },
  {
    path: "/tanya-jawab",
    name: "QNAPage",
    component: QNAPage,
  },
  {
    path: "/form",
    name: "FormPage",
    component: FormPage,
  },
  {
    path: "/form-investment",
    name: "FormInvestment",
    component: FormInvestment,
  },
  {
    path: "/chart-page",
    name: "ChartPage",
    component: ChartsPage,
  },
  {
    path: "/chart/:name",
    name: "ChartPage",
    component: ChartPage,
  },
  {
    path: "/investment-chart/simas-satu",
    name: "Chart Simas Satu",
    component: chartSimasSatu,
  },
  {
    path: "/investment-chart/danamas-pasti",
    name: "Chart Danamas Pasti",
    component: chartDanamasPasti,
  },
  {
    path: "/investment-chart/danamas-stabil",
    name: "Chart 008",
    component: chartDanamasStabil,
  },
  {
    path: "/investment-chart/danamas-rupiah-plus",
    name: "Chart 014",
    component: chartDanamasRupiahPlus,
  },
  {
    path: "/investment-chart/simas-danamas-saham",
    name: "Chart Simas Danamas Saham",
    component: chartSimasDanamasSaham,
  },
  {
    path: "/investment-chart/simas-satu-prima",
    name: "Chart Simas Satu Prima",
    component: chartSimasSatuPrima,
  },
  {
    path: "/investment-chart/simas-saham-bertumbuh",
    name: "Chart Simas Saham Bertumbuh",
    component: chartSimasSahamBertumbuh,
  },
  {
    path: "/investment-chart/simas-saham-maksima",
    name: "Chart Simas Saham Maksima",
    component: chartSimasSahamMaksima,
  },
  {
    path: "/investment-chart/simas-syariah-pendapatan-tetap",
    name: "Chart Simas Syariah Pendapatan Tetap",
    component: chartSimasSyariahPendapatanTetap,
  },
  {
    path: "/stock-ticker",
    name: "Stock Ticker",
    component: StockTicker,
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
