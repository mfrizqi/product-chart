import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/pages/Home.vue";
import Calculator from "../components/pages/Calculator.vue";
import ReksadanaCampuran from "../components/pages/reksadana-campuran/reksadanaCampuran";
import ReksadanaDetail from "../components/pages/reksadana-campuran/reksadanaDetail";
import InvestmentPlan from "../components/pages/InvestmentPlan";
import InvestmentPlanV2 from "../components/pages/InvestmentPlanV2";
import risetPage from "../components/pages/RisetPage";
import corporateFinance from "../components/pages/CorporateFinance";
import QNAPage from "../components/pages/QNAPage";
import FormPage from "../components/pages/FormPage";
import FormInvestment from "../components/pages/FormInvestment";
import ChartsPage from "../components/pages/ChartsPage";
import ChartPage from "../components/pages/ChartPage";
import StockTicker from "../components/pages/StockTicker";
import NabYtd from "../components/pages/NabYtd";
import ProductTypes from "../components/pages/ProductTypes"

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
    path: "/investment-plan-v2",
    name: "investmentPlanV2",
    component: InvestmentPlanV2,
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
    path: "/stock-ticker",
    name: "Stock Ticker",
    component: StockTicker,
  },
  {
    path: "/nab-ytd",
    name: "NAB & YTD",
    component: NabYtd,
  },
  {
    path: "/product-type/:type",
    name: "ProductTypes",
    component: ProductTypes,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
